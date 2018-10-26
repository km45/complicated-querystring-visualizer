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
            coord: [],
            libs: []
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
            coord: [],
            libs: []
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
            ],
            libs: []
        };

        const encodedComma = '%2C';

        const expected = [
          ['coord1', ['x1', 'y1', 'z1'].join(encodedComma)].join('='),
          ['coord2', ['x2', 'y2', 'z2'].join(encodedComma)].join('=')
        ].join('&');

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
    it('libs only', () => {
        const input: QueryBinder = {
            basic: [],
            coord: [],
            libs: [
                ['libs', 'lib1.so', 'lib2.so']
            ]
        }

        const encodedPeriod = '%2e';

        const expected = [
            'libs',
            [
                ['lib1', 'so'].join(encodedPeriod),
                ['lib2', 'so'].join(encodedPeriod)
            ].join('.')
        ].join('=');

        const actual = generateQuery(input);

        expect(actual).toEqual(expected);
    });
    it('none', () => {
        const input: QueryBinder = {
            basic: [],
            coord: [],
            libs: []
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
            coord: [],
            libs: []
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
            coord: [],
            libs: []
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
            ],
            libs: []
        };

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
    it('libs only', () => {
        const encodedPeriod = '%2e';

        const input = [
            'libs',
            [
                ['lib1', 'so'].join(encodedPeriod),
                ['lib2', 'so'].join(encodedPeriod)
            ].join('.')
        ].join('=');

        const expected: QueryBinder = {
            basic: [],
            coord: [],
            libs: [
                ['libs', 'lib1.so', 'lib2.so']
            ]
        }

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
    it('none', () => {
        const input = '';

        const expected: QueryBinder = {
            basic: [],
            coord: [],
            libs: []
        };

        const actual = parseQuery(input);

        expect(actual).toEqual(expected);
    });
});
