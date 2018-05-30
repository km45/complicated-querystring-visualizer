import {
    ArrayRow, ArrayTable, Columns, ObjectRow, ObjectTable
} from './table-data-type'

export function parseQuery(query: string): ArrayTable {
    return query.split('&').map(
        (element: string): ArrayRow => {
            return element.split('=');
        });
}

export function generateQuery(parameters: ArrayTable): string {
    return parameters.map(
        (v: ArrayRow): string => {
            return v.join('=');
        }).join('&');
}

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