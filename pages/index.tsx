import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Button, List } from "rsuite";
import MainTable, { DataRow, RATES } from "../components/MainTable";
import styles from "../styles/Home.module.css";

const MinimumIncome = 167400;
const MinimumIncome10pc = MinimumIncome * 0.1;
const TaxKey = 15;

interface TaxResults {
  currentYearLoss: number;
  currentYearIncome: number;
  currentYearSmallScaleIncome: number;
  currentYearTaxableIncome: number;
  currentYearTaxableLoss: number;
  currentYearTax: number;
}

const Home: NextPage = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [taxResults, setTaxResults] = useState<TaxResults | null>(null);

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

  const handleToggleState = (id: number) => {
    const nextData = [...data];
    const activeItem = nextData.find((item) => item.id === id);
    if (activeItem) {
      activeItem.status = activeItem.status ? null : "EDIT";
    }
    setData(nextData);
  };

  const handleDeleteRow = (id: number) => {
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

      <main className={styles.main}>
        <MainTable
          data={data}
          handleChange={handleChange}
          handleToggleState={handleToggleState}
          handleDeleteRow={handleDeleteRow}
        />
        <Button
          appearance="default"
          block
          style={{ height: 24, width: 1400, padding: 2 }}
          onClick={newRow}
        >
          + Új sor
        </Button>

        <section className={styles.results}>
          <List>
            <List.Item>Minimálbér (202X): {MinimumIncome} HUF</List.Item>
            <List.Item>
              Minimálbér 10% (202X): {MinimumIncome10pc} HUF
            </List.Item>
            <List.Item>Adókulcs: {TaxKey}% </List.Item>
          </List>

          <List>
            <List.Item>
              <b>TOTAL tárgyév eredmény (HUF)</b>
            </List.Item>
            <List.Item>Veszteség: {taxResults?.currentYearLoss}</List.Item>
            <List.Item>Jövedelem: {taxResults?.currentYearIncome}</List.Item>
          </List>

          <List>
            <List.Item>
              <b>TOTAL kisértékű bevételek (HUF)</b>
            </List.Item>
            <List.Item>
              Jövedelem: {taxResults?.currentYearSmallScaleIncome}
            </List.Item>
          </List>

          <List>
            <List.Item>
              <b>TOTAL tárgyév adózandó eredmény (HUF)</b>
            </List.Item>
            <List.Item>
              Veszteség: {taxResults?.currentYearTaxableLoss}
            </List.Item>
            <List.Item>
              Jövedelem: {taxResults?.currentYearTaxableIncome}
            </List.Item>
            <List.Item>Adó: {taxResults?.currentYearTax}</List.Item>
          </List>

          <span>SZJA bevallás 164. sor</span>
        </section>
      </main>

      <footer className={styles.footer}>
        💸💸 Powered by Kriptobevallas.hu © {new Date().getFullYear()} 💸💸
      </footer>
    </div>
  );
};

export default Home;
