import Image from "next/image";
import { Button, DatePicker, InputPicker } from "rsuite";
import { Table, Cell, Column, HeaderCell } from "rsuite-table";

type AnyProps = any;

const CURRENCIES = ["USD", "HUF", "EUR"];
export const RATES = { USD: 350, HUF: 1, EUR: 400 };

const baseCellStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const customHeaderStyle = {
  background: "#FFD700",

  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "15px",

  textTransform: "uppercase",

  color: "#121212",

}

const CustomHeaderCell = (props: any) => {
  return (
    <HeaderCell {...props} style={customHeaderStyle}>
      {props.children}
    </HeaderCell>
  );
}

export const EditCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange } = props;
  return (
    <Cell {...props} style={baseCellStyle}>
      <input
        className="rs-input"
        defaultValue={rowData[dataKey]}
        onChange={(event) => {
          handleChange & handleChange(rowData.id, dataKey, event.target.value);
        }}
      />
    </Cell>
  );
};

export const IncomeExpenseCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange } = props;
  let editing = true;
  if (dataKey === "income" && rowData.expense) editing = false;
  if (dataKey === "expense" && rowData.income) editing = false;

  return (
    <Cell {...props} style={baseCellStyle}>
      {editing ? (
        <input
          type="number"
          className="rs-input"
          min="1"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            handleChange &
              handleChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};


export const DateCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange } = props;
  return (
    <Cell {...props} style={baseCellStyle}>
      <DatePicker
        oneTap
        cleanable={false}
        ranges={[]} // Disable bottom row
        placeholder="Dátum"
        defaultValue={
          rowData[dataKey] ? new Date(Date.parse(rowData[dataKey])) : null
        }
        onChange={(date) => {
          handleChange &
            handleChange(
              rowData.id,
              dataKey,
              date?.toISOString().split("T")[0]
            );
        }}
        style={{width: "200px"}}
      />
    </Cell>
  );
};

export const DropdownCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange, options } = props;
  return (
    <Cell {...props} style={baseCellStyle}>
      <InputPicker
        data={options}
        cleanable={false}
        creatable={false}
        onChange={(value) => {
          handleChange(rowData.id, dataKey, value);
        }}
        style={{width: "80px"}}
        placeholder={<div></div>}
      />
    </Cell>
  );
};

const DeleteRowButtonCell = (props: AnyProps) => {
  const { rowData, dataKey, handleClick } = props;

  return (
    <Cell {...props} style={baseCellStyle}>
      <button
        onClick={() => {
          handleClick & handleClick(rowData.id);
        }}
        style={{ background: "transparent" }}
      >
        <Image src="/x.svg" alt="delete button" width={20} height={20}/>
      </button>
    </Cell>
  );
};

const SmallScaleCell = (props: AnyProps) => {
  const { rowData, dataKey } = props;

  return (
    <Cell {...props} style={baseCellStyle}>
      {rowData[dataKey] == null ? null : rowData[dataKey] ? "IGEN" : "NEM"}
    </Cell>
  );
};

export interface DataRow {
  id?: number;
  date?: string;
  income?: number;
  expense?: number;
  currency?: string;
  rate?: number;
  result?: number;
  comment?: string;
  smallScale?: boolean;
}

type MainTableProps = {
  data: DataRow[];
  handleChange: (id: number, key: string, value: string) => void;
  handleDeleteRow: (id: number) => void;
};

const MainTable = (props: MainTableProps) => {
  const { data, handleChange, handleDeleteRow } = props;

  const tableProps = {
    rowHeight: 66,
    minHeight: 350,
    autoHeight: data.length < 10,
    height: data.length < 10 ? undefined : 660,
    width: 1150,
  }

  return (
    <Table {...tableProps} data={data}>
      <Column width={40} align="center">
        <CustomHeaderCell>#</CustomHeaderCell>
        <Cell dataKey="id" style={{...baseCellStyle, justifyContent: "flex-end"}}/>
      </Column>

      <Column width={150} align="center">
        <CustomHeaderCell>Dátum</CustomHeaderCell>
        <DateCell dataKey="date" handleChange={handleChange} />
      </Column>

      <Column width={100} align="center">
        <CustomHeaderCell>Bevétel</CustomHeaderCell>
        <IncomeExpenseCell dataKey="income" handleChange={handleChange} />
      </Column>

      <Column width={100} align="center">
        <CustomHeaderCell>Kiadás</CustomHeaderCell>
        <IncomeExpenseCell dataKey="expense" handleChange={handleChange} />
      </Column>

      <Column width={150}>
        <CustomHeaderCell align="center">Pénznem</CustomHeaderCell>
        <DropdownCell
          dataKey="currency"
          handleChange={handleChange}
          options={CURRENCIES.map((c) => {
            return { value: c, label: c };
          })}
        />
      </Column>

      <Column width={100} align="center">
        <CustomHeaderCell>Árfolyam</CustomHeaderCell>
        <Cell dataKey="rate" style={baseCellStyle}/>
      </Column>

      <Column width={100} align="center">
        <CustomHeaderCell>Eredmény</CustomHeaderCell>
        <Cell dataKey="result" style={baseCellStyle}/>
      </Column>

      <Column width={150} align="center">
        <CustomHeaderCell>Megjegyzés</CustomHeaderCell>
        <EditCell dataKey="comment" handleChange={handleChange} />
      </Column>

      <Column flexGrow={1} align="center">
        <CustomHeaderCell>Kisértékű ügylet</CustomHeaderCell>
        <SmallScaleCell dataKey="smallScale" />
      </Column>

      <Column align="center">
        <CustomHeaderCell>Törlés</CustomHeaderCell>
        <DeleteRowButtonCell dataKey="delete" handleClick={handleDeleteRow} />
      </Column>
    </Table>
  );
};

export default MainTable;
