import {
    arrayRowToObjectRow, arrayTableToObjectTable,
    objectRowToArrayRow, objectTableToArrayTable
} from "./table-data";

describe('LogicConverterTest', () => {
    it('arrayRowToObjectRow', () => {
        const columns = [
            { key: 'k1' },
            { key: 'k2' }
        ];
        const row = ['v1', 'v2'];

        const expected = {
            k1: 'v1',
            k2: 'v2'
        };

        const actual = arrayRowToObjectRow(columns, row);

        expect(actual).toEqual(expected);
    });
    it('arrayTableToObjectTable', () => {
        const columns = [
            { key: 'k1' },
            { key: 'k2' }
        ];
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

        const actual = arrayTableToObjectTable(columns, rows);

        expect(actual).toEqual(expected);
    });
    it('objectRowToArrayRow', () => {
        const columns = [
            { key: 'k1' },
            { key: 'k2' }
        ];
        const object = {
            k1: 'v1',
            k2: 'v2'
        };

        const expected = ['v1', 'v2'];

        const actual = objectRowToArrayRow(columns, object);

        expect(actual).toEqual(expected);
    });
    it('objectTableToArrayTable', () => {
        const columns = [
            { key: 'k1' },
            { key: 'k2' }
        ];
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

        const actual = objectTableToArrayTable(columns, object);

        expect(actual).toEqual(expected);
    });
});
