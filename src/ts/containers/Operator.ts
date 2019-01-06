import {ColumnsDefinition} from '../logic/query-binder';
import {arrayTableToObjectTable, ObjectTable, objectTableToArrayTable} from '../logic/table-data';
import * as UrlBinder from '../logic/url-binder';

interface ObjectTables {
  basic: ObjectTable;
  coord: ObjectTable;
  host: ObjectTable;
  libs: ObjectTable;
}

export function generateUrl(tables: ObjectTables): string {
  return UrlBinder.generateUrl({
    host:
        objectTableToArrayTable(UrlBinder.ColumnsDefinition.host, tables.host),
    query: {
      basic: objectTableToArrayTable(ColumnsDefinition.basic, tables.basic),
      coord: objectTableToArrayTable(ColumnsDefinition.coord, tables.coord),
      libs: objectTableToArrayTable(ColumnsDefinition.libs, tables.libs)
    }
  });
}

export function parseUrl(url: string): ObjectTables {
  const parsed = UrlBinder.parseUrl(url);

  return {
    basic: arrayTableToObjectTable(ColumnsDefinition.basic, parsed.query.basic),
    coord: arrayTableToObjectTable(ColumnsDefinition.coord, parsed.query.coord),
    host: arrayTableToObjectTable(UrlBinder.ColumnsDefinition.host, parsed.host),
    libs: arrayTableToObjectTable(ColumnsDefinition.libs, parsed.query.libs)
  };
}
