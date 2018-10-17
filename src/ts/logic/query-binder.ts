import * as Pythonic from 'pythonic';
import * as QueryString from 'querystring';

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

function convertParsedUrlQueryElementToString(
    key: string,
    values: string | string[] | undefined
): string | undefined {
    if (values === undefined) {
        console.log(`Unexpected undefined value for "${key}"`);
        return undefined;
    }

    if (Array.isArray(values)) {
        // type of values is string[]
        console.log(`"${key}" appears more than once. Use only first value.`);
        return values[0];
    }

    // type of values is string
    return values;
}

export function parseQuery(query: string): QueryBinder {
    const table = QueryString.parse(query, '&', '=');

    const basic: ArrayTable = [];
    const coord: ArrayTable = [];

    for (const [key, values] of Pythonic.items(table)) {
      const value = convertParsedUrlQueryElementToString(key, values);
      if (value === undefined) {
        continue;
      }

      if (key.match(/^coord[0-9]+$/)) {
        coord.push([key].concat(value.split(',')));
      } else if (key) {  // ignore empty key
        basic.push([key, value]);
      }
    }

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
