import {
    ArrayRow, ArrayTable, Columns, ObjectRow, ObjectTable
} from './table-data'

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