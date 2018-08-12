import * as Pythonic from 'pythonic';

export type ArrayRow = string[];
export type ArrayTable = ArrayRow[];

export interface ObjectRow {
    [key: string]: string;
}
export type ObjectTable = ObjectRow[];

export interface Column {
    key: string;
    name?: string;
}
export type Columns = Column[];

export function arrayRowToObjectRow(columns: Columns, row: ArrayRow): ObjectRow {
    const v: ObjectRow = {};
    for (const [column, cell] of Pythonic.zip(columns, row)) {
        v[column.key] = cell;
    }

    return v;
}

export function arrayTableToObjectTable(columns: Columns, table: ArrayTable): ObjectTable {
    return table.map((row: ArrayRow) => {
        return arrayRowToObjectRow(columns, row);
    });
}

export function objectRowToArrayRow(columns: Columns, row: ObjectRow): ArrayRow {
    return columns.map((column: Column) => {
        return row[column.key];
    });
}

export function objectTableToArrayTable(columns: Columns, table: ObjectTable): ArrayTable {
    return table.map((row: ObjectRow) => {
        return objectRowToArrayRow(columns, row);
    });
}
