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
    let v: ObjectRow = {};
    for (let i = 0; i < columns.length; ++i) {
        v[columns[i].key] = row[i];
    }
    return v;
}

export function arrayTableToObjectTable(columns: Columns, table: ArrayTable): ObjectTable {
    let v: ObjectTable = [];
    for (let i = 0; i < table.length; ++i) {
        v.push(arrayRowToObjectRow(columns, table[i]));
    }
    return v;
}

export function objectRowToArrayRow(columns: Columns, obj: ObjectRow): ArrayRow {
    let v: ArrayRow = [];
    for (let i = 0; i < columns.length; ++i) {
        v.push(obj[columns[i].key]);
    }
    return v;
}

export function objectTableToArrayTable(columns: Columns, obj: ObjectTable): ArrayTable {
    let v: ArrayTable = [];
    for (let i = 0; i < obj.length; ++i) {
        v.push(objectRowToArrayRow(columns, obj[i]));
    }
    return v;
}