import {
    ArrayRow, ArrayTable, Columns
} from './table-data';

export class ColumnsDefinition {
    public static readonly basic: Columns = [
        { key: 'key', name: 'Key' },
        { key: 'value', name: 'Value' }];
    public static readonly coord: Columns = [
        { key: 'key', name: 'Key' },
        { key: 'x', name: 'x' },
        { key: 'y', name: 'y' },
        { key: 'z', name: 'z' }];
}

export interface QueryBinder {
    basic: ArrayTable;
    coord: ArrayTable;
}

export function parseQuery(query: string): QueryBinder {
    const table = query.split('&').map(
        (element: string): ArrayRow => {
            return element.split('=');
        });

    const basic: ArrayTable = [];
    const coord: ArrayTable = [];

    table.forEach((v: ArrayRow) => {
        if (v[0].match(/^coord[0-9]+$/)) {
            coord.push([v[0]].concat(v[1].split(',')));
        } else if (v[0]) {  // ignore empty key
            basic.push(v);
        }
    });

    return {
        basic,
        coord
    };
}

export function generateQuery(binder: QueryBinder): string {
    let params: string[] = [];
    params = params.concat(binder.basic.map(
        (v: ArrayRow): string => {
            return v.join('=');
        }));
    params = params.concat(binder.coord.map(
        (v: ArrayRow): string => {
            return [v[0], v.slice(1).join(',')].join('=');
        }));
    return params.join('&');
}
