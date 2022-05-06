import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainTable, { DataRow, getRate } from "../components/tables/MainTable";
import Navbar from "../components/Navbar";
import TextSection from "../components/TextSection";
import TextSectionContainer from "../components/TextSectionContainer";
import styles from "../styles/Home.module.css";

import { SECTIONS } from "../utils/texts";
import Button from "../components/Button";
import ResultTables, { TaxResults } from "../components/tables/ResultTables";
import { generateUUID } from "../utils/formatting";

const MinimumIncome = 167400;
const MinimumIncome10pc = MinimumIncome * 0.1;
const TaxKey = 15;

const mainTableStyle = {
  width: "85%",
  alignSelf: "center",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginBottom: "50px",
};

const defaultData: DataRow[] = [{ id: 1, uuid: generateUUID() }, { id: 2, uuid: generateUUID() }, { id: 3, uuid: generateUUID() }, { id: 4, uuid: generateUUID() }];

const defaultTaxResults = {
  currentYearLoss: 0,
  currentYearIncome: 0,
  currentYearSmallScaleIncome: 0,
  currentYearTaxableIncome: 0,
  currentYearTaxableLoss: 0,
  currentYearTax: 0,
};

function validRow(row: DataRow): boolean {
  const isValid =
    row.id != null &&
    row.date != null &&
    (row.income != null || row.expense != null) &&
    row.result != null &&
    row.smallScale != null;
  return isValid;
}

const Home: NextPage = () => {
  const [data, setData] = useState<DataRow[]>(defaultData);
  const [previousDataLength, setPreviousDataLength] = useState<number>(0);
  const [taxResults, setTaxResults] = useState<TaxResults>(defaultTaxResults);
  const tableRef = useRef();

  useEffect( () => {
    if (tableRef && tableRef.current && data.length !== previousDataLength) {
      console.log("scroll", data.length *  100)
      // @ts-ignore
      tableRef.current.scrollTop((data.length+1) *  100);
    }
  }, [data]);

  const calculateNextDataResults = (updatedData: DataRow[]) => {
    const nextData = updatedData.map((item) => ({
      ...item,
    }));

    nextData.forEach((item) => {
      const sameDateIncomes = nextData.filter(
        (e) => e.date != null && e.date == item.date && e.income != null
      );
      if (sameDateIncomes.length > 1) {
        sameDateIncomes.forEach((e) =>
          e.result ? (e.smallScale = false) : (e.smallScale = undefined)
        );
      } else if (item.result && item.result <= MinimumIncome10pc) {
        item.smallScale = true;
      } else if (item.result && item.result > MinimumIncome10pc) {
        item.smallScale = false;
      }
    });

    const expenses = nextData.filter((e) => e.expense != null);
    expenses.forEach((item) => (item.smallScale = false));

    const sumResult = nextData.reduce(
      (sum, item) => (validRow(item) ? sum + (item.result || 0) : sum),
      0
    );

    const sumSmallScale = nextData.reduce(
      (sum, item) =>
        validRow(item) ? sum + (item.smallScale ? item.result || 0 : 0) : sum,
      0
    );
    const smallScaleResult = sumSmallScale <= MinimumIncome ? sumSmallScale : 0;

    const currentYearLoss = sumResult < 0 ? -1 * sumResult : 0;
    const currentYearIncome = sumResult > 0 ? sumResult : 0;

    const taxableIncome =
      sumResult - smallScaleResult > 0 ? sumResult - smallScaleResult : 0;

    const taxableLoss =
      sumResult + smallScaleResult < 0 ? -1 * (sumResult) + smallScaleResult : 0;

    const newTaxResults = {
      currentYearLoss: currentYearLoss,
      currentYearIncome: currentYearIncome,
      currentYearSmallScaleIncome: smallScaleResult,
      currentYearTaxableIncome: taxableIncome,
      currentYearTaxableLoss: taxableLoss,
      currentYearTax: taxableIncome * (TaxKey / 100),
    };

    setTaxResults(newTaxResults);
    setPreviousDataLength(data.length);
    setData(nextData);
  };

  const handleChange = (id: number, key: string, value: any) => {
    const nextData = data.map((item) => ({
      ...item,
    }));

    const editedItem = nextData.find((item) => item.id === id);
    if (editedItem) {
      //@ts-ignore
      editedItem[key as keyof DataRow] = value;

      if (editedItem.currency && editedItem.date)
        editedItem.rate = getRate(editedItem.date, editedItem.currency);

      if (editedItem.rate) {
        if (editedItem.income) {
          editedItem.result = editedItem.income * editedItem.rate;
        } else if (editedItem.expense) {
          editedItem.result = -1 * editedItem.expense * editedItem.rate;
        } else {
          editedItem.result = undefined;
          editedItem.smallScale = undefined;
        }
      } else {
        editedItem.result = undefined;
        editedItem.smallScale = undefined;
      }
    }

    calculateNextDataResults(nextData);
  };

  const handleDeleteRow = (id?: number) => {
    if (id == null) return;
    const nextData = data
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index + 1 }));
    calculateNextDataResults(nextData);
  };

  const newRow = () => {
    const nextData = data.map((item) => ({
      ...item,
    }));
    nextData.push({ id: data.length + 1, uuid: generateUUID() });
    setPreviousDataLength(data.length);
    setData(nextData);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kripto Bevallás</title>
        <meta name="description" content="Kripto bevallás" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Body>
        <Header />

        <div style={mainTableStyle}>
          <MainTable
            data={data}
            tableRef={tableRef}
            handleChange={handleChange}
            handleDeleteRow={handleDeleteRow}
          />
          <Button text="+ Új sor" onClick={newRow} />
        </div>

        <ResultTables {...taxResults} />
        <Button
          icon="/pdf.svg"
          text="PDF Exportálás"
          onClick={() => {
            window.print();
          }}
        />

        <div style={{ margin: "30px" }} />

        <TextSectionContainer>
          {SECTIONS.map((section, i) => (
            <TextSection {...section} key={`section-${i}`} />
          ))}
        </TextSectionContainer>
      </Body>

      <Footer />
    </div>
  );
};

export default Home;
