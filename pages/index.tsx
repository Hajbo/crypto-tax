import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainTable, { DataRow, RATES } from "../components/tables/MainTable";
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

const Home: NextPage = () => {
  const [data, setData] = useState<DataRow[]>(defaultData);
  const [taxResults, setTaxResults] = useState<TaxResults>(defaultTaxResults);

  const handleChange = (id: number, key: string, value: any) => {
    const nextData = [...data];
    const editedItem = nextData.find((item) => item.id === id);
    if (editedItem) {
      editedItem[key as keyof DataRow] = value;

      if (editedItem.currency)
        editedItem.rate = RATES[editedItem.currency as keyof typeof RATES];
      if (editedItem.rate) {
        if (editedItem.income) {
          editedItem.result = editedItem.income * editedItem.rate;
          editedItem.smallScale = editedItem.result <= MinimumIncome10pc;
        } else if (editedItem.expense) {
          editedItem.result = -1 * editedItem.expense * editedItem.rate;
          editedItem.smallScale = false; // TODO: Not sure about it
        }
      }
    }

    const sumResult = nextData.reduce(
      (sum, item) => sum + (item.result || 0),
      0
    );
    const sumSmallScale = nextData.reduce(
      (sum, item) => sum + (item.smallScale ? item.result || 0 : 0),
      0
    );

    const currentYearLoss = sumResult < 0 ? -1 * sumResult : 0;
    const currentYearIncome = sumResult > 0 ? sumResult : 0;

    const taxableIncome =
      sumResult - sumSmallScale > 0 ? sumResult - sumSmallScale : 0;
    const taxableLoss =
      currentYearLoss - sumSmallScale !== -1 * sumSmallScale
        ? Math.abs(currentYearLoss - sumSmallScale)
        : 0;

    const newTaxResults = {
      currentYearLoss: currentYearLoss,
      currentYearIncome: currentYearIncome,
      currentYearSmallScaleIncome: sumSmallScale,
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
        <Button icon="/pdf.svg" text="PDF Exportálás" onClick={() => {}} />

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
