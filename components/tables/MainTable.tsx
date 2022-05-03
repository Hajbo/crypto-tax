import Image from "next/image";
import { InputPicker } from "rsuite";
import { Table, Cell, Column, HeaderCell } from "rsuite-table";
import { DateInput, IDateFormatProps } from "@blueprintjs/datetime";
import MomentLocaleUtils from "react-day-picker/moment";
import moment from "moment";
import "moment/locale/hu";
import { separatedNumber } from "../../utils/formatting";
import TableTooltip from "../TableTooltip";
import {
  currencyTooltip,
  dateTooltip,
  expenseTooltip,
  incomeTooltip,
  rateTooltip,
  resultTooltip,
  smallScaleTooltip,
} from "../../utils/texts";

const DATE_FORMAT = "YYYY-MM-DD";

type AnyProps = any;

const CURRENCIES = ["USD", "HUF", "EUR"];
export const RATES = { USD: 350, HUF: 1, EUR: 400 };

const baseCellStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  fontFamily: "Montserrat !important",
  fontStyle: "normal !important",
  fontWeight: 400,
  fontSize: "12px !important",
  lineHeight: "15px !important",

  textTransform: "uppercase" as const,

  color: "#121212 !important",
};

const customHeaderStyle = {
  background: "#FFD700",

  fontFamily: "Montserrat",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "15px",

  textTransform: "uppercase" as const,

  color: "#121212",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
};

const CustomHeaderCell = (props: any) => {
  return (
    <HeaderCell {...props} style={customHeaderStyle}>
      {props.children}
    </HeaderCell>
  );
};

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
      <input
        type="number"
        className={editing ? "rs-input" : "rs-input rs-input-disabled"}
        min="1"
        step="0.0000000000000001"
        defaultValue={rowData[dataKey]}
        onChange={(event) => {
          handleChange(rowData.id, dataKey, event.target.value);
        }}
        disabled={!editing}
      />
    </Cell>
  );
};

function getMomentFormatter(format: string): IDateFormatProps {
  // note that locale argument comes from locale prop and may be undefined
  return {
    formatDate: (date: Date, locale: string) =>
      moment(date).locale(locale).format(format),
    parseDate: (str: string, locale: string) =>
      moment(str, format).locale(locale).toDate(),
    placeholder: "Dátum",
  };
}

const dateCellRightElement = (
  <Image src="/calendar.svg" width={12} height={12} alt="calendar" />
);

export const DateCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange } = props;
  return (
    <Cell {...props} style={baseCellStyle}>
      <DateInput
        locale="hu"
        localeUtils={MomentLocaleUtils}
        {...getMomentFormatter(DATE_FORMAT)}
        closeOnSelection
        reverseMonthAndYearMenus
        onChange={(date: Date) => {
          handleChange &
            handleChange(
              rowData.id,
              dataKey,
              date?.toISOString().split("T")[0]
            );
        }}
        value={rowData[dataKey] ? new Date(Date.parse(rowData[dataKey])) : null}
        initialMonth={new Date(2021, 0, 1)}
        minDate={new Date(2021, 0, 1)}
        maxDate={new Date(2021, 11, 31)}
        rightElement={dateCellRightElement}
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
        style={{ width: "80px" }}
        placeholder={<div></div>}
      />
    </Cell>
  );
};

const DeleteRowButtonCell = (props: AnyProps) => {
  const { rowData, dataKey, handleDeleteRow } = props;

  return (
    <Cell {...props} style={baseCellStyle}>
      <button
        onClick={() => {
          handleDeleteRow(rowData.id);
        }}
        style={{ background: "transparent" }}
      >
        <Image src="/x.svg" alt="delete button" width={20} height={20} />
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

const ResultCell = (props: AnyProps) => {
  const { rowData, dataKey } = props;

  return (
    <Cell {...props} style={baseCellStyle}>
      {rowData[dataKey] == null
        ? null
        : `${separatedNumber(rowData[dataKey])} HUF`}
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
  handleDeleteRow: (id?: number) => void;
};

const MainTable = (props: MainTableProps) => {
  const { data, handleChange, handleDeleteRow } = props;

  const tableProps = {
    rowHeight: 66,
    minHeight: 350,
    autoHeight: data.length < 10,
    height: data.length < 10 ? undefined : 660,
    width: 1150,
  };

  const renderEmptyData = (
    <div style={{ width: "100%", textAlign: "center" }}>Hiánzyó adatok</div>
  );

  return (
    <Table {...tableProps} data={data} renderEmpty={() => renderEmptyData}>
      <Column width={40} align="center">
        <CustomHeaderCell>#</CustomHeaderCell>
        <Cell
          dataKey="id"
          style={{ ...baseCellStyle, justifyContent: "flex-end" }}
        />
      </Column>

      <Column width={150} align="center">
        <CustomHeaderCell>
          Dátum <TableTooltip text={dateTooltip} />
        </CustomHeaderCell>
        <DateCell dataKey="date" handleChange={handleChange} />
      </Column>

      <Column width={100} align="center">
        <CustomHeaderCell>
          Bevétel <TableTooltip text={incomeTooltip} />
        </CustomHeaderCell>
        <IncomeExpenseCell dataKey="income" handleChange={handleChange} />
      </Column>

      <Column width={100} align="center">
        <CustomHeaderCell>
          Kiadás <TableTooltip text={expenseTooltip} />
        </CustomHeaderCell>
        <IncomeExpenseCell dataKey="expense" handleChange={handleChange} />
      </Column>

      <Column width={150}>
        <CustomHeaderCell align="center">
          Pénznem <TableTooltip text={currencyTooltip} />
        </CustomHeaderCell>
        <DropdownCell
          dataKey="currency"
          handleChange={handleChange}
          options={CURRENCIES.map((c) => {
            return { value: c, label: c };
          })}
        />
      </Column>

      <Column width={110} align="center">
        <CustomHeaderCell>
          Árfolyam <TableTooltip text={rateTooltip} />
        </CustomHeaderCell>
        <Cell dataKey="rate" style={baseCellStyle} />
      </Column>

      <Column width={110} align="center">
        <CustomHeaderCell>
          Eredmény <TableTooltip text={resultTooltip} />
        </CustomHeaderCell>
        <ResultCell dataKey="result" />
      </Column>

      <Column width={150} align="center">
        <CustomHeaderCell>Megjegyzés</CustomHeaderCell>
        <EditCell dataKey="comment" handleChange={handleChange} />
      </Column>

      <Column width={160} align="center">
        <CustomHeaderCell>
          Kisértékű ügylet <TableTooltip text={smallScaleTooltip} />
        </CustomHeaderCell>
        <SmallScaleCell dataKey="smallScale" />
      </Column>

      <Column align="center">
        <CustomHeaderCell>Törlés</CustomHeaderCell>
        <DeleteRowButtonCell
          dataKey="delete"
          handleDeleteRow={handleDeleteRow}
        />
      </Column>
    </Table>
  );
};

export default MainTable;
