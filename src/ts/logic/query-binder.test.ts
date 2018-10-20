import {
    generateQuery, parseQuery, QueryBinder
} from './query-binder';

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
    it('basic only with value encoded & that is used separator if not encoded', () => {
        const encodedAmpersand = '%26';

        const input: QueryBinder = {
            basic: [
                ['view', 'Q&A'],
                ['no', '1']
            ],
            coord: []
        };

        const expected = [
            ['view', 'Q' + encodedAmpersand + 'A'].join('='),
            ['no', '1'].join('=')
        ].join('&');

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

        const encodedComma = '%2C';

        const expected = [
          ['coord1', ['x1', 'y1', 'z1'].join(encodedComma)].join('='),
          ['coord2', ['x2', 'y2', 'z2'].join(encodedComma)].join('=')
        ].join('&');

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

        const encodedComma = '%2C';

        const expected = [
            ['a', '1'].join('='),
            ['b', '2'].join('='),
            ['c', '3'].join('='),
            ['coord1', ['x1', 'y1', 'z1'].join(encodedComma)].join('='),
            ['coord2', ['x2', 'y2', 'z2'].join(encodedComma)].join('=')
        ].join('&');

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
    it('none', () => {
        const input: QueryBinder = {
            basic: [],
            coord: []
        };

        const expected = '';

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
    it('basic only with value encoded & that is used separator if not encoded', () => {
        const encodedAmpersand = '%26';

        const input = [
            ['view', 'Q' + encodedAmpersand + 'A'].join('='),
            ['no', '1'].join('=')
        ].join('&');

        const expected: QueryBinder = {
            basic: [
                ['view', 'Q&A'],
                ['no', '1']
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
    it('none', () => {
        const input = '';

        const expected: QueryBinder = {
            basic: [],
            coord: []
        };

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
});
