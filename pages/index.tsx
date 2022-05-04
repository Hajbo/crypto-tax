import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
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

const defaultData: DataRow[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

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
  const [taxResults, setTaxResults] = useState<TaxResults>(defaultTaxResults);

  const handleChange = (id: number, key: string, value: any) => {
    const nextData = [...data];
    const editedItem = nextData.find((item) => item.id === id);
    if (editedItem) {
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

      nextData.forEach((item) => {
        const sameDateItems = nextData.filter(
          (e) => e.date != null && e.date == item.date
        );
        if (sameDateItems.length > 1) {
          sameDateItems.forEach((e) =>
            e.result ? (e.smallScale = false) : (e.smallScale = undefined)
          );
        } else if (item.result && item.result <= MinimumIncome10pc) {
          item.smallScale = true;
        } else if (item.result) {
          item.smallScale = false;
        }
      });
    }

    const sumResult = nextData.reduce(
      (sum, item) => (validRow(item) ? sum + (item.result || 0) : sum),
      0
    );
    const sumSmallScale = nextData.reduce(
      (sum, item) =>
        validRow(item) ? sum + (item.smallScale ? item.result || 0 : 0) : sum,
      0
    );

    console.log(sumResult, sumSmallScale);

    const smallScaleResult = sumSmallScale <= MinimumIncome ? sumSmallScale : 0;

    const currentYearLoss = sumResult < 0 ? -1 * sumResult : 0;
    const currentYearIncome = sumResult > 0 ? sumResult : 0;

    const taxableIncome =
      sumResult - smallScaleResult > 0 ? sumResult - smallScaleResult : 0;
    const taxableLoss =
      currentYearLoss - smallScaleResult !== -1 * smallScaleResult
        ? Math.abs(currentYearLoss - smallScaleResult)
        : 0;

    const newTaxResults = {
      currentYearLoss: currentYearLoss,
      currentYearIncome: currentYearIncome,
      currentYearSmallScaleIncome: smallScaleResult,
      currentYearTaxableIncome: taxableIncome,
      currentYearTaxableLoss: taxableLoss,
      currentYearTax: taxableIncome * (TaxKey / 100),
    };

    setTaxResults(newTaxResults);
    setData(nextData);
  };

  const handleDeleteRow = (id?: number) => {
    if (id == null) return;
    const nextData = data.filter((item) => item.id !== id);
    setData(nextData);
  };

  const newRow = () => {
    const nextData = [...data, { id: data.length + 1 }];
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
