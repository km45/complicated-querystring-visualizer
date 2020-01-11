import {generateQuery, parseQuery, QueryBinder} from './query-binder';

type TestName = string;

interface TestParameter {
  binder: QueryBinder;
  queryString: string;

  skipGenerateQueryTest?: boolean;
  skipParseQueryTest?: boolean;
}

type TestCase = [TestName, TestParameter];

// eslint-disable-next-line jest/no-export
export const emptyQueryBinder: QueryBinder = {
  basic: [],
  coord: [],
  json: '[]',
  libs: []
};

const encodedAmpersand = '%26';
const encodedPeriod = '%2E';
const encodedComma = '%2C';

const testCases: TestCase[] = [
  [
    'basic only', {
      binder:
          {...emptyQueryBinder, basic: [['a', '1'], ['b', '2'], ['c', '3']]},
      queryString: ['a=1', 'b=2', 'c=3'].join('&')
    }
  ],
  [
    'basic only with value encoded & that is used separator if not encoded', {
      binder: {...emptyQueryBinder, basic: [['view', 'Q&A'], ['no', '1']]},
      queryString: [
        ['view', 'Q' + encodedAmpersand + 'A'].join('='), ['no', '1'].join('=')
      ].join('&')
    }
  ],
  [
    'coord only', {
      binder: {
        ...emptyQueryBinder,
        coord: [['coord1', 'x1', 'y1', 'z1'], ['coord2', 'x2', 'y2', 'z2']]
      },
      queryString: [
        ['coord1', ['x1', 'y1', 'z1'].join(encodedComma)].join('='),
        ['coord2', ['x2', 'y2', 'z2'].join(encodedComma)].join('=')
      ].join('&')
    }
  ],
  [
    'coord only with non-encoded separator comma', {
      binder: {
        ...emptyQueryBinder,
        coord: [['coord1', 'x1', 'y1', 'z1'], ['coord2', 'x2', 'y2', 'z2']]
      },
      queryString: [
        ['coord1', ['x1', 'y1', 'z1'].join(',')].join('='),
        ['coord2', ['x2', 'y2', 'z2'].join(',')].join('=')
      ].join('&'),
      skipGenerateQueryTest: true
    }
  ],
  [
    'libs only', {
      binder: {...emptyQueryBinder, libs: [['libs', 'lib1.so', 'lib2.so']]},
      queryString: [
        'libs',
        [
          ['lib1', 'so'].join(encodedPeriod), ['lib2', 'so'].join(encodedPeriod)
        ].join('.')
      ].join('=')
    }
  ],
  [
    'json only', {
      binder: {
        ...emptyQueryBinder,
        json: [
          '[',
          [
            '{"json1":{"id":1,"name":"alice"}}',
            '{"json2":{"name":"origin","coord":{"x":-1,"y":3}}}'
          ].join(','),
          ']'
        ].join('')
      },
      queryString: [
        [
          'json1',
          encodeURIComponent('{"id":1,"name":"alice"}')
        ].join('='),
        [
          'json2',
          encodeURIComponent('{"name":"origin","coord":{"x":-1,"y":3}}')
        ].join('=')
      ].join('&')
    }
  ],
  ['none', {queryString: '', binder: {...emptyQueryBinder}}]
];

describe.each(testCases)(
    'query-binder / %s', (_: string, p: TestParameter): void => {
      test('generateQuery', () => {
        if (p.skipGenerateQueryTest) {
          return;
        }

        const input = p.binder;
        const expected = p.queryString;

        const actual = generateQuery(input);
        expect(actual).toEqual(expected);
      });

      test('parseQuery', () => {
        if (p.skipParseQueryTest) {
          return;
        }

        const input = p.queryString;
        const expected = p.binder;

        const actual = parseQuery(input);
        expect(actual).toEqual(expected);
      });
    });
