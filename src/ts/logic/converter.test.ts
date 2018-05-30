import {
    generateQuery, parseQuery,
    arrayRowToObjectRow, arrayTableToObjectTable,
    objectRowToArrayRow, objectTableToArrayTable
} from "./converter";

describe('LogicConverterTest', () => {
    it('GenerateQuery', () => {
        const input = [
            ['a', '1'],
            ['b', '2'],
            ['c', '3']
        ];

        const expected = 'a=1&b=2&c=3';

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
    it('ParseQuery', () => {
        const input = 'a=1&b=2&c=3';

        const expected = [
            ['a', '1'],
            ['b', '2'],
            ['c', '3']
        ];

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
    it('arrayRowToObjectRow', () => {
        const keys = ['k1', 'k2'];
        const row = ['v1', 'v2'];

        const expected = {
            k1: 'v1',
            k2: 'v2'
        };

        const actual = arrayRowToObjectRow(keys, row);

        expect(actual).toEqual(expected);
    });
    it('arrayTableToObjectTable', () => {
        const column_kes = ['k1', 'k2'];
        const rows = [
            ['a1', 'a2'],
            ['b1', 'b2'],
            ['c1', 'c2']
        ];

        const expected = [
            { k1: 'a1', k2: 'a2' },
            { k1: 'b1', k2: 'b2' },
            { k1: 'c1', k2: 'c2' }
        ];

        const actual = arrayTableToObjectTable(column_kes, rows);

        expect(actual).toEqual(expected);
    });
    it('objectRowToArrayRow', () => {
        const keys = ['k1', 'k2'];
        const object = {
            k1: 'v1',
            k2: 'v2'
        };

        const expected = ['v1', 'v2'];

        const actual = objectRowToArrayRow(keys, object);

        expect(actual).toEqual(expected);
    });
    it('objectTableToArrayTable', () => {
        const column_kes = ['k1', 'k2'];
        const object = [
            { k1: 'a1', k2: 'a2' },
            { k1: 'b1', k2: 'b2' },
            { k1: 'c1', k2: 'c2' }
        ];

        const expected = [
            ['a1', 'a2'],
            ['b1', 'b2'],
            ['c1', 'c2'],
        ];

        const actual = objectTableToArrayTable(column_kes, object);

        expect(actual).toEqual(expected);
    });
});
