interface BasicParameter {
    key: string;
    value: string;
}

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