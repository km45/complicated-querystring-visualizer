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
    public static readonly libs: Columns = [
        { key: 'key', name: 'Key' },
        { key: 'lib1', name: 'lib1' },
        { key: 'lib2', name: 'lib2' }
    ];
}

export interface QueryBinder {
    basic: ArrayTable;
    coord: ArrayTable;
    json: string;
    libs: ArrayTable;
}

export function parseQuery(query: string): QueryBinder {
    const table = query.split('&').map((keyValuePair: string) => {
        return keyValuePair.split('=');
    });

    const basic: ArrayTable = [];
    const coord: ArrayTable = [];
    const libs: ArrayTable = [];

    const jsonParams: string[][] = [];

    for (const param of table) {
        const key = param[0];
        const value = param[1];

        if (key.match(/^coord[0-9]+$/)) {
            coord.push([key].concat(decodeURIComponent(value).split(',')));
        } else if (key === 'libs') {
            libs.push([key].concat(value.split('.').map((v: string) => {
                return decodeURIComponent(v);
            })));
        } else if (key.match(/^json[0-9]+$/)) {
            jsonParams.push([key, decodeURIComponent(value)]);
        } else if (key) {  // ignore empty key
            basic.push([key, decodeURIComponent(value)]);
        }
    }

    const json = [
        '[',
        jsonParams.map((v: string[]): string => {
            const key = v[0];
            const value = v[1];
            return '{"' + key + '":' + value + '}';
        }).join(','),
        ']'
    ].join('');

    return {
        basic,
        coord,
        json,
        libs
    };
}

function fixedEncodeURIComponent(str: string): string {
    return encodeURIComponent(str).replace(/[-_.!~*'()]/g, (c: string) => {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}

export function generateQuery(binder: QueryBinder): string {
    const basic = binder.basic.map((v: ArrayRow): [string, string] => {
        const key = v[0];
        const value = v[1];
        return [key, encodeURIComponent(value)];
    });

    const coord = binder.coord.map((v: ArrayRow): [string, string] => {
        const key = v[0];

        const values = v.slice(1);
        const value = encodeURIComponent(values.join(','));
        return [key, value];
    });

    const libs = binder.libs.map((v: ArrayRow): [string, string] => {
        const key = v[0];

        const values = v.slice(1);
        const value = values
            .map((s: string) => {
                return fixedEncodeURIComponent(s);
            })
            .join('.');

        return [key, value];
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json = JSON.parse(binder.json).map((v: any): [string, string] => {
        const key = Object.keys(v)[0];
        const value = encodeURIComponent(JSON.stringify(v[key]));
        return [key, value];
    });

    return Array.prototype.concat(basic, coord, libs, json)
        .map((v: [string, string]) => {
            return v.join('=');
        })
        .join('&');
}
