import {
    generateQuery, parseQuery, QueryBinder
} from "./query-binder";

describe('query-binder GenerateQuery test', () => {
    it('basic only', () => {
        const input: QueryBinder = {
            basic: [
                ['a', '1'],
                ['b', '2'],
                ['c', '3']
            ],
            coord: []
        };

        const expected = 'a=1&b=2&c=3';

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
    it('coord only', () => {
        const input: QueryBinder = {
            basic: [],
            coord: [
                ['coord1', 'x1', 'y1', 'z1'],
                ['coord2', 'x2', 'y2', 'z2']
            ]
        };

        const expected = 'coord1=x1,y1,z1&coord2=x2,y2,z2';

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
    it('all', () => {
        const input: QueryBinder = {
            basic: [
                ['a', '1'],
                ['b', '2'],
                ['c', '3']
            ],
            coord: [
                ['coord1', 'x1', 'y1', 'z1'],
                ['coord2', 'x2', 'y2', 'z2']
            ]
        };

        const expected = 'a=1&b=2&c=3&coord1=x1,y1,z1&coord2=x2,y2,z2';

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
});

describe('query-binder ParseQuery test', () => {
    it('basic only', () => {
        const input = 'a=1&b=2&c=3';

        const expected: QueryBinder = {
            basic: [
                ['a', '1'],
                ['b', '2'],
                ['c', '3']
            ],
            coord: []
        };

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
    it('coord only', () => {
        const input = 'coord1=x1,y1,z1&coord2=x2,y2,z2';

        const expected: QueryBinder = {
            basic: [],
            coord: [
                ['coord1', 'x1', 'y1', 'z1'],
                ['coord2', 'x2', 'y2', 'z2']
            ]
        };

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
    it('all', () => {
        const input = 'a=1&b=2&c=3&coord1=x1,y1,z1&coord2=x2,y2,z2';

        const expected = {
            basic: [
                ['a', '1'],
                ['b', '2'],
                ['c', '3']
            ],
            coord: [
                ['coord1', 'x1', 'y1', 'z1'],
                ['coord2', 'x2', 'y2', 'z2']
            ]
        };

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
});
