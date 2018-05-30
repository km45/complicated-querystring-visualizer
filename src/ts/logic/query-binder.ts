import {
    ArrayRow, ArrayTable, Columns, ObjectRow, ObjectTable
} from './table-data'

interface QueryBinder {
    basic: ArrayTable;
}

export function parseQuery(query: string): QueryBinder {
    let table = query.split('&').map(
        (element: string): ArrayRow => {
            return element.split('=');
        });

    return {
        basic: table
    };
}

export function generateQuery(binder: QueryBinder): string {
    return binder.basic.map(
        (v: ArrayRow): string => {
            return v.join('=');
        }).join('&');
}