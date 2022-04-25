import { Button, DatePicker, InputPicker } from "rsuite";
import { Table, Cell, Column, HeaderCell } from "rsuite-table";

type AnyProps = any;

const CURRENCIES = ["USD", "HUF", "EUR"];
export const RATES = { USD: 350, HUF: 1, EUR: 400 };

export const EditCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange } = props;
  const editing = rowData.status === "EDIT";
  const padding = editing ? "6px" : "13px";
  return (
    <Cell {...props} style={{ padding: padding }}>
      {editing ? (
        <input
          className="rs-input"
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

export const IncomeExpenseCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange } = props;
  let editing = rowData.status === "EDIT";
  if (dataKey === "income" && rowData.expense) editing = false;
  if (dataKey === "expense" && rowData.income) editing = false;

  const padding = editing ? "6px" : "13px";
  return (
    <Cell {...props} style={{ padding: padding }}>
      {editing ? (
        <input
          type="number"
          className="rs-input"
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
  const editing = rowData.status === "EDIT";
  const padding = editing ? "6px" : "13px";
  return (
    <Cell {...props} style={{ padding: padding }}>
      {editing ? (
        <DatePicker
          oneTap
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
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

export const DropdownCell = (props: AnyProps) => {
  const { rowData, dataKey, handleChange, options } = props;
  const editing = rowData.status === "EDIT";
  const padding = editing ? "6px" : "13px";
  return (
    <Cell {...props} style={{ padding: padding }}>
      {editing ? (
        <InputPicker
          data={options}
          onChange={(value) => {
            handleChange(rowData.id, dataKey, value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

const EditButtonCell = (props: AnyProps) => {
  const { rowData, dataKey, handleClick } = props;

  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        onClick={() => {
          handleClick & handleClick(rowData.id);
        }}
      >
        {rowData.status === "EDIT" ? "💾" : "⚙️"}
      </Button>
    </Cell>
  );
};

const DeleteRowButtonCell = (props: AnyProps) => {
  const { rowData, dataKey, handleClick } = props;

  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        onClick={() => {
          handleClick & handleClick(rowData.id);
        }}
      >
        ❌
      </Button>
    </Cell>
  );
};

const SmallScaleCell = (props: AnyProps) => {
  const { rowData, dataKey, handleClick } = props;

  return (
    <Cell {...props} style={{ padding: "13px" }}>
      {rowData[dataKey] == null ? null : rowData[dataKey] ? "Igen" : "Nem"}
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
  status?: "EDIT" | null;
}

type MainTableProps = {
  data: DataRow[];
  handleChange: (id: number, key: string, value: string) => void;
  handleToggleState: (id: number) => void;
  handleDeleteRow: (id: number) => void;
};

const MainTable = (props: MainTableProps) => {
  const { data, handleChange, handleToggleState, handleDeleteRow } = props;

  return (
    <Table height={420} width={1400} data={data}>
      <Column width={80}>
        <HeaderCell>Sorszám</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={180}>
        <HeaderCell>Dátum (YYY.MM.DD.)</HeaderCell>
        <DateCell dataKey="date" handleChange={handleChange} />
      </Column>

      <Column width={100}>
        <HeaderCell>Bevétel</HeaderCell>
        <IncomeExpenseCell dataKey="income" handleChange={handleChange} />
      </Column>

      <Column width={100}>
        <HeaderCell>Kiadás</HeaderCell>
        <IncomeExpenseCell dataKey="expense" handleChange={handleChange} />
      </Column>

      <Column width={120}>
        <HeaderCell>Pénznem</HeaderCell>
        <DropdownCell
          dataKey="currency"
          handleChange={handleChange}
          options={CURRENCIES.map((c) => {
            return { value: c, label: c };
          })}
        />
      </Column>

      <Column width={120}>
        <HeaderCell>Árfolyam (HUF)</HeaderCell>
        <Cell dataKey="rate" />
      </Column>

      <Column width={120}>
        <HeaderCell>Eredmény (HUF)</HeaderCell>
        <Cell dataKey="result" />
      </Column>

      <Column width={200}>
        <HeaderCell>Megjegyzés</HeaderCell>
        <EditCell dataKey="comment" handleChange={handleChange} />
      </Column>

      <Column width={130}>
        <HeaderCell>Kisértékű ügylet?</HeaderCell>
        <SmallScaleCell dataKey="smallScale" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>{null}</HeaderCell>
        <EditButtonCell dataKey="edit" handleClick={handleToggleState} />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>{null}</HeaderCell>
        <DeleteRowButtonCell dataKey="delete" handleClick={handleDeleteRow} />
      </Column>
    </Table>
  );
};

export default MainTable;
