import {
    generateQuery, parseQuery
} from "./converter";

describe('LogicConverterTest', () => {
    it('GenerateQuery', () => {
        const input = [
            ['a', '1'],
            ['b', '2'],
            ['c', '3']
        ];

        const expected = 'a=1&b=2&c=3';

        const actual = generateQuery({
            basic: input
        });

        expect(actual).toEqual(expected);
    });
    it('ParseQuery', () => {
        const input = 'a=1&b=2&c=3';

        const expected = {
            basic: [
                ['a', '1'],
                ['b', '2'],
                ['c', '3']
            ]
        };

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
});
