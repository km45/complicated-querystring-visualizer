import {
    ArrayRow, ArrayTable, Columns, ObjectRow, ObjectTable
} from './table-data'

export class ColumnsDefinition {
    static readonly basic: Columns = [
        {
            key: 'key',
            name: 'Key'
        }, {
            key: 'value',
            name: 'Value'
        }];
    static readonly coord: Columns = [
        {
            key: 'key',
            name: 'Key'
        }, {
            key: 'x',
            name: 'x'
        }, {
            key: 'y',
            name: 'y'
        }, {
            key: 'z',
            name: 'z'
        }];
}

export interface QueryBinder {
    basic: ArrayTable;
    coord: ArrayTable;
}

export function parseQuery(query: string): QueryBinder {
    let table = query.split('&').map(
        (element: string): ArrayRow => {
            return element.split('=');
        });

    let basic: ArrayTable = [];
    let coord: ArrayTable = [];

    table.forEach((v: ArrayRow) => {
        if (v[0].match(/^coord[0-9]+$/)) {
            coord.push([v[0]].concat(v[1].split(',')));
        } else {
            basic.push(v);
        }
    });

    return {
        basic: basic,
        coord: coord
    };
}

export function generateQuery(binder: QueryBinder): string {
    let params: string[] = [];
    if (binder.basic != null) {
        params = params.concat(binder.basic.map(
            (v: ArrayRow): string => {
                return v.join('=');
            }));
    }
    if (binder.coord != null) {
        params = params.concat(binder.coord.map(
            (v: ArrayRow): string => {
                return [v[0], v.slice(1).join(',')].join('=');
            }));
    }
    return params.join('&');
}