import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Button, List } from "rsuite";
import MainTable, { DataRow } from "../components/MainTable";
import styles from "../styles/Home.module.css";

const MinimumIncome = 167400;
const MinimumIncome10pc = MinimumIncome * 0.1;
const TaxKey = 15;

const Home: NextPage = () => {
  const [data, setData] = useState<DataRow[]>([]);

  const handleChange = (id: number, key: string, value: any) => {
    const nextData = [...data];
    const editedItem = nextData.find((item) => item.id === id);
    if (editedItem) {
      editedItem[key as keyof DataRow] = value;
    }
    setData(nextData);
  };
  const handleEditState = (id: number) => {
    const nextData = [...data];
    const activeItem = nextData.find((item) => item.id === id);
    if (activeItem) {
      activeItem.status = activeItem.status ? null : "EDIT";
    }
    setData(nextData);
  };

  const newRow = () => {
    const nextData = [...data, { id: data.length + 1 }];
    setData(nextData);
  }

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
          handleEditState={handleEditState}
        />
        <Button
          appearance="default"
          block
          style={{ height: 24, width: 1200, padding: 2 }}
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
            <List.Item>Veszteség: </List.Item>
            <List.Item>Jövedelem: </List.Item>
          </List>

          <List>
            <List.Item>
              <b>TOTAL kisértékű bevételek (HUF)</b>
            </List.Item>
            <List.Item>Jövedelem: </List.Item>
          </List>

          <List>
            <List.Item>
              <b>TOTAL tárgyév adózandó eredmény (HUF)</b>
            </List.Item>
            <List.Item>Veszteség: </List.Item>
            <List.Item>Jövedelem: </List.Item>
            <List.Item>Adó: </List.Item>
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
