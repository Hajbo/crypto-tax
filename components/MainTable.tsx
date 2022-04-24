import { Button } from "rsuite";
import { Table, Cell, Column, HeaderCell } from "rsuite-table";


type AnyProps = any;

export const EditCell = (props: AnyProps) => {
  const { rowData, dataKey, onChange } = props;
  const editing = rowData.status === "EDIT";
  return (
    <Cell {...props} className={editing ? "table-content-editing" : ""}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

const ActionCell = (props: AnyProps) => {
  const { rowData, dataKey, onClick } = props;

  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick && onClick(rowData.id);
        }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
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
};


type MainTableProps = {
  data: DataRow[];
  handleChange: (id: number, key: string, value: string) => void;
  handleEditState: (id: number) => void;
}

const MainTable = (props: MainTableProps) => {
  const { data, handleChange, handleEditState } = props;

  return (
    <Table height={420} width={1200} data={data}>
      <Column width={80}>
        <HeaderCell>Sorszám</HeaderCell>
        <EditCell dataKey="id" onChange={handleChange} />
      </Column>

      <Column width={150}>
        <HeaderCell>Dátum (YYY.MM.DD.)</HeaderCell>
        <EditCell dataKey="date" onChange={handleChange} />
      </Column>

      <Column width={100}>
        <HeaderCell>Bevétel</HeaderCell>
        <EditCell dataKey="income" onChange={handleChange} />
      </Column>

      <Column width={100}>
        <HeaderCell>Kiadás</HeaderCell>
        <EditCell dataKey="expense" onChange={handleChange} />
      </Column>

      <Column width={80}>
        <HeaderCell>Pénznem</HeaderCell>
        <EditCell dataKey="currency" onChange={handleChange} />
      </Column>

      <Column width={120}>
        <HeaderCell>Árfolyam (HUF)</HeaderCell>
        <EditCell dataKey="rate" onChange={handleChange} />
      </Column>

      <Column width={120}>
        <HeaderCell>Eredmény (HUF)</HeaderCell>
        <EditCell dataKey="result" onChange={handleChange} />
      </Column>

      <Column width={200}>
        <HeaderCell>Megjegyzés</HeaderCell>
        <EditCell dataKey="comment" onChange={handleChange} />
      </Column>

      <Column width={130}>
        <HeaderCell>Kisértékű ügylet?</HeaderCell>
        <EditCell dataKey="smallScale" onChange={handleChange} />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Action</HeaderCell>
        <ActionCell dataKey="id" onClick={handleEditState} />
      </Column>
    </Table>
  );
};

export default MainTable;
