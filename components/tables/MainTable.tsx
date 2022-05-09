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
import { RATES } from "../../utils/rates";

const DATE_FORMAT = "YYYY-MM-DD";

type AnyProps = any;

const CURRENCIES = Object.keys(RATES["2021-01-04"]);

export const getRate = (dateString: string, currency: string) => {
  if (currency === "HUF") return 1;

  const dateUtils = getMomentFormatter(DATE_FORMAT);

  if (Object.keys(RATES).includes(dateString)) {
    const dailyRates = RATES[dateString as keyof typeof RATES];
    return dailyRates[currency as keyof typeof dailyRates];
  }

  // If the date isn't in the list, then it's a holiday or weekend
  // Step back one by one until the first weekday
  var tmpDate = dateUtils.parseDate(dateString, "hu") as Date;
  while (tmpDate) {
    tmpDate = moment(tmpDate).subtract(1, "days").locale("hu").toDate();
    const tmpDateString = dateUtils.formatDate(tmpDate, "hu");
    if (Object.keys(RATES).includes(tmpDateString)) {
      const dailyRates = RATES[tmpDateString as keyof typeof RATES];
      return dailyRates[currency as keyof typeof dailyRates];
    }
  }
};

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
  alignSelf: "center",
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
  const { rowData, dataKey, handleChange, ...rest } = props;
  return (
    <Cell {...rest} style={baseCellStyle}>
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
  const { rowData, dataKey, handleChange, ...rest } = props;
  let editing = true;
  if (dataKey === "income" && rowData.expense) editing = false;
  if (dataKey === "expense" && rowData.income) editing = false;

  const onChange = (event: any) => {
    handleChange(rowData.id, dataKey, event.target.value);
  };

  return (
    <Cell {...rest} style={baseCellStyle}>
      <input
        type="number"
        className={editing ? "rs-input" : "rs-input rs-input-disabled"}
        min="1"
        step="0.0000000000000001"
        defaultValue={rowData[dataKey]}
        onChange={onChange}
        disabled={!editing}
        key={`key-${rowData.id}-${dataKey}-${editing}-${rowData.uuid}`}
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
  const { rowData, dataKey, handleChange, ...rest } = props;
  const dateFormatUtils = getMomentFormatter(DATE_FORMAT);
  return (
    <Cell {...rest} style={baseCellStyle}>
      <DateInput
        locale="hu"
        localeUtils={MomentLocaleUtils}
        {...dateFormatUtils}
        closeOnSelection
        reverseMonthAndYearMenus
        onChange={(date: Date) => {
          handleChange(
            rowData.id,
            dataKey,
            dateFormatUtils.formatDate(date, "hu")
          );
        }}
        value={rowData[dataKey] ? new Date(Date.parse(rowData[dataKey])) : null}
        initialMonth={
          rowData[dataKey]
            ? new Date(Date.parse(rowData[dataKey]))
            : new Date(2021, 0, 1)
        }
        minDate={new Date(2021, 0, 1)}
        maxDate={new Date(2021, 11, 31)}
        rightElement={dateCellRightElement}
      />
    </Cell>
  );
};

export const DropdownCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange, options, ...rest } = props;
  console.log(rowData);
  return (
    <Cell {...rest} style={baseCellStyle}>
      <InputPicker
        data={options}
        value={rowData[dataKey] != null ? rowData[dataKey] : undefined}
        cleanable={false}
        creatable={false}
        onChange={(value) => {
          handleChange(rowData.id, dataKey, value);
        }}
        style={{ width: "80px" }}
        placeholder={<div></div>}
        key={`key-${rowData.id}-${dataKey}-${rowData.uuid}`}
      />
    </Cell>
  );
};

const DeleteRowButtonCell = (props: AnyProps) => {
  const { rowData, dataKey, handleDeleteRow, ...rest } = props;

  return (
    <Cell {...rest} style={baseCellStyle}>
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
  const { rowData, dataKey, ...rest } = props;

  return (
    <Cell {...rest} style={baseCellStyle}>
      {rowData[dataKey] == null ? null : rowData[dataKey] ? "IGEN" : "NEM"}
    </Cell>
  );
};

const ResultCell = (props: AnyProps) => {
  const { rowData, dataKey, ...rest } = props;

  return (
    <Cell {...rest} style={baseCellStyle}>
      {rowData[dataKey] == null
        ? null
        : `${separatedNumber(rowData[dataKey], 4)} HUF`}
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
  uuid: string;
}

type MainTableProps = {
  data: DataRow[];
  tableRef: any;
  handleChange: (id: number, key: string, value: string) => void;
  handleDeleteRow: (id?: number) => void;
};

const MainTable = (props: MainTableProps) => {
  const { data, handleChange, handleDeleteRow, tableRef } = props;

  const tableProps = {
    rowHeight: 66,
    minHeight: 350,
    autoHeight: data.length < 10,
    height: data.length < 10 ? undefined : 660,
    width: 1170,
  };

  const renderEmptyData = (
    <div style={{ width: "100%", textAlign: "center" }}>Hiánzyó adatok</div>
  );

  const onDataUpdated = (p: any) => {
    if (p === "bodyHeightChanged") {
      return { x: (data.length + 1) * 100 };
    }
    return {};
  };

  return (
    <Table
      {...tableProps}
      data={data}
      renderEmpty={() => renderEmptyData}
      ref={tableRef}
      shouldUpdateScroll={onDataUpdated}
      hover={false}
    >
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
