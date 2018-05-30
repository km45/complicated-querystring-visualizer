import {
    generateQuery, parseQuery
} from "./query-binder";

describe('query-binder test', () => {
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
