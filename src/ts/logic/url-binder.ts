import * as QueryBinder from './query-binder';
import * as TableData from './table-data';

export class ColumnsDefinition {
    static readonly host: TableData.Columns = [
        { key: 'key', name: 'Key' },
        { key: 'value', name: 'Value' }
    ];
    static readonly query: QueryBinder.ColumnsDefinition;
}

export interface UrlBinder {
    host: TableData.ArrayTable;
    query: QueryBinder.QueryBinder;
}

export function parseUrl(url: string): UrlBinder {
    // HACK: Consider to use URL
    // https://developer.mozilla.org/ja/docs/Web/API/URL
    const splited_strings = url.split('?');
    console.log(splited_strings);

    let host_string: string = '';
    let query_string: string = '';

    if (splited_strings.length == 2) {
        host_string = splited_strings[0];
        query_string = splited_strings[1];
    } else if (splited_strings.length == 1) {
        // Treat as query
        query_string = splited_strings[0];
    }

    const host: TableData.ArrayTable = [
        ['host', host_string]
    ];

    const query: QueryBinder.QueryBinder =
        QueryBinder.parseQuery(query_string);

    return {
        host: host,
        query: query
    };
}

export function generateUrl(binder: UrlBinder): string {
    let url: string = '';

    // TODO: refactor
    const host_string = binder.host[0][1];
    url += (host_string == '' ? '' : host_string + '?');

    url += QueryBinder.generateQuery(binder.query);
    return url;
}