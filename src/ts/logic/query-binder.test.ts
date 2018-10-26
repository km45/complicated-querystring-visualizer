import {generateQuery, parseQuery, QueryBinder} from './query-binder';

interface TestParameter {
  queryString: string;
  binder: QueryBinder;
  skipGenerateQueryTest?: boolean;
  skipParseQueryTest?: boolean;
}

type TestCase = [string, TestParameter];

const emptyQueryBinder: QueryBinder = {
  basic: [],
  coord: [],
  libs: []
};

const encodedAmpersand = '%26';
const encodedPeriod = '%2E';
const encodedComma = '%2C';

const testCases: TestCase[] = [
  [
    'basic only', {
      queryString: ['a=1', 'b=2', 'c=3'].join('&'),
      binder:
          {...emptyQueryBinder, basic: [['a', '1'], ['b', '2'], ['c', '3']]}
    }
  ],
  [
    'basic only with value encoded & that is used separator if not encoded', {
      queryString: [
        ['view', 'Q' + encodedAmpersand + 'A'].join('='), ['no', '1'].join('=')
      ].join('&'),
      binder: {...emptyQueryBinder, basic: [['view', 'Q&A'], ['no', '1']]}
    }
  ],
  [
    'coord only', {
      queryString: [
        ['coord1', ['x1', 'y1', 'z1'].join(encodedComma)].join('='),
        ['coord2', ['x2', 'y2', 'z2'].join(encodedComma)].join('=')
      ].join('&'),
      binder: {
        ...emptyQueryBinder,
        coord: [['coord1', 'x1', 'y1', 'z1'], ['coord2', 'x2', 'y2', 'z2']]
      }
    }
  ],
  [
    'coord only with non-encoded separator comma', {
      queryString: [
        ['coord1', ['x1', 'y1', 'z1'].join(',')].join('='),
        ['coord2', ['x2', 'y2', 'z2'].join(',')].join('=')
      ].join('&'),
      binder: {
        ...emptyQueryBinder,
        coord: [['coord1', 'x1', 'y1', 'z1'], ['coord2', 'x2', 'y2', 'z2']]
      },
      skipGenerateQueryTest: true
    }
  ],
  [
    'libs only', {
      queryString: [
        'libs',
        [
          ['lib1', 'so'].join(encodedPeriod), ['lib2', 'so'].join(encodedPeriod)
        ].join('.')
      ].join('='),
      binder: {...emptyQueryBinder, libs: [['libs', 'lib1.so', 'lib2.so']]}
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
