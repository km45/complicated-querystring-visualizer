export type ArrayRow = string[];
export type ArrayTable = ArrayRow[];

export type ObjectRow = { [key: string]: string };
export type ObjectTable = ObjectRow[];

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

export function arrayRowToObjectRow(keys: string[], row: ArrayRow): ObjectRow {
    let v: ObjectRow = {};
    for (let i = 0; i < keys.length; ++i) {
        v[keys[i]] = row[i];
    }
    return v;
}

export function arrayTableToObjectTable(column_keys: string[], table: ArrayTable): ObjectTable {
    let v: ObjectTable = [];
    for (let i = 0; i < table.length; ++i) {
        v.push(arrayRowToObjectRow(column_keys, table[i]));
    }
    return v;
}

export function objectRowToArrayRow(keys: string[], obj: ObjectRow): ArrayRow {
    let v: ArrayRow = [];
    for (let i = 0; i < keys.length; ++i) {
        v.push(obj[keys[i]]);
    }
    return v;
}

export function objectTableToArrayTable(column_keys: string[], obj: ObjectTable): ArrayTable {
    let v: ArrayTable = [];
    for (let i = 0; i < obj.length; ++i) {
        v.push(objectRowToArrayRow(column_keys, obj[i]));
    }
    return v;
}