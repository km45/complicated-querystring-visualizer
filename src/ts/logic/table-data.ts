export type ArrayRow = string[];
export type ArrayTable = ArrayRow[];

export type ObjectRow = { [key: string]: string };
export type ObjectTable = ObjectRow[];

export interface Column {
    key: string;
    name?: string;
}
export type Columns = Column[];

export function arrayRowToObjectRow(columns: Columns, row: ArrayRow): ObjectRow {
    // TODO: refactor
    let v: ObjectRow = {};
    for (let i = 0; i < columns.length; ++i) {
        v[columns[i].key] = row[i];
    }
    return v;
}

export function arrayTableToObjectTable(columns: Columns, table: ArrayTable): ObjectTable {
    return table.map((row: ArrayRow) => {
        return arrayRowToObjectRow(columns, row);
    });
}

export function objectRowToArrayRow(columns: Columns, obj: ObjectRow): ArrayRow {
    return columns.map((column: Column) => {
        return obj[column.key];
    });
}

export function objectTableToArrayTable(columns: Columns, obj: ObjectTable): ArrayTable {
    return obj.map((row: ObjectRow) => {
        return objectRowToArrayRow(columns, row);
    });
}
