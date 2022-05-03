import {
  ResultTableValueWrapper,
  ResultTableWrapper,
} from "./ResultTableWrapper";

export interface TaxResults {
  currentYearLoss: number;
  currentYearIncome: number;
  currentYearSmallScaleIncome: number;
  currentYearTaxableIncome: number;
  currentYearTaxableLoss: number;
  currentYearTax: number;
}

const resultTableStyles = {
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignSelf: "center",

  gap: "20px",

  width: "800px",
  height: "420px",
};

const partialResultStyles = {
  display: "flex",
  flexFlow: "row",
  justifyContent: "space-between",
  width: "800px",
  gapp: "20px",
};

const smallGreenDots = "/smallGreenDots.svg";
const taxTableStyles = {
  backgroundImage: `url(${smallGreenDots})`,
  //backgroundPosition: "left bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "35px 35px",
  backgroundPosition: "10px calc(100% - 10px)",
};

const ResultTables = (props: TaxResults) => {
  return (
    <div style={resultTableStyles}>
      <div style={partialResultStyles}>
        <ResultTableWrapper header="TOTAL tárgyév eredmény (HUF)" width="450px">
          <ResultTableValueWrapper
            header="Veszteség"
            value={props.currentYearLoss}
            width="130px"
          />
          <ResultTableValueWrapper
            header="Jövedelem"
            value={props.currentYearIncome}
            width="130px"
          />
        </ResultTableWrapper>

        <ResultTableWrapper
          header="TOTAL kisértékű bevételek (HUF)"
          width="330px"
        >
          <ResultTableValueWrapper
            header="Jövedelem"
            value={props.currentYearSmallScaleIncome}
            width="130px"
          />
        </ResultTableWrapper>
      </div>
      <ResultTableWrapper
        header="TOTAL tárgyév adózandó eredmény (HUF)"
        width="800px"
        bottomText="SZJA bevallás 164. sor"
        customChildrenCss={taxTableStyles}
      >
        <ResultTableValueWrapper
          header="2021 évi Veszteség"
          value={props.currentYearTaxableLoss}
          bigFont
          width="190px"
        />
        <ResultTableValueWrapper
          header="Jövedelem"
          value={props.currentYearTaxableIncome}
          bigFont
          width="190px"
        />
        <ResultTableValueWrapper
          header="Adó"
          value={props.currentYearTax}
          bigFont
          width="190px"
        />
      </ResultTableWrapper>
    </div>
  );
};

export default ResultTables;
