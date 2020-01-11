import * as QueryBinder from './query-binder';
import * as TableData from './table-data';

export class ColumnsDefinition {
    public static readonly host: TableData.Columns = [
        { key: 'key', name: 'Key' },
        { key: 'value', name: 'Value' }
    ];
    public static readonly query: QueryBinder.ColumnsDefinition;
}

export interface UrlBinder {
    host: TableData.ArrayTable;
    query: QueryBinder.QueryBinder;
}

export function parseUrl(url: string): UrlBinder {
    // HACK: Consider to use URL
    // https://developer.mozilla.org/ja/docs/Web/API/URL
    const splitedStrings = url.split('?');
    console.log(splitedStrings);

    let hostString = '';
    let queryString = '';

    if (splitedStrings.length === 2) {
        hostString = splitedStrings[0];
        queryString = splitedStrings[1];
    } else if (splitedStrings.length === 1) {
        // Treat as query
        queryString = splitedStrings[0];
    }

    const host: TableData.ArrayTable = [
        ['host', hostString]
    ];

    const query: QueryBinder.QueryBinder =
        QueryBinder.parseQuery(queryString);

    return {
        host,
        query
    };
}

export function generateUrl(binder: UrlBinder): string {
    let url = '';

    // TODO: refactor
    const hostString = binder.host[0][1];
    url += (hostString === '' ? '' : hostString + '?');

    url += QueryBinder.generateQuery(binder.query);
    return url;
}
