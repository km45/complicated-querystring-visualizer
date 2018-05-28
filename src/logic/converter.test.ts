import { generateQuery, parseQuery } from "./converter";

describe('LogicConverterTest', () => {
    it('GenerateQuery', () => {
        const input = [
            { key: 'a', value: '1' },
            { key: 'b', value: '2' },
            { key: 'c', value: '3' }
        ];

        const expected = 'a=1&b=2&c=3';

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
    it('ParseQuery', () => {
        const input = 'a=1&b=2&c=3';

        const expected = [
            { key: 'a', value: '1' },
            { key: 'b', value: '2' },
            { key: 'c', value: '3' }
        ];

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
});
