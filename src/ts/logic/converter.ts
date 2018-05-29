interface BasicParameter {
    key: string;
    value: string;
}

type ArrayRow = string[];
type ArrayTable = ArrayRow[];

type ObjectRow = { [key: string]: string };
type ObjectTable = ObjectRow[];

export function parseQuery(query: string): BasicParameter[] {
    return query.split('&').map(
        (element: string): BasicParameter => {
            let v = element.split('=');
            return {
                key: v[0],
                value: v[1]
            };
        })
}

export function generateQuery(parameters: BasicParameter[]): string {
    return parameters.map(
        (v: BasicParameter): string => {
            return v.key + '=' + v.value;
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