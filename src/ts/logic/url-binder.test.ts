import {emptyQueryBinder} from './query-binder.test';
import {generateUrl, parseUrl, UrlBinder} from './url-binder';

type TestName = string;

interface TestParameter {
  url: string;
  binder: UrlBinder;
  skipGenerateUrlTest?: boolean;
  skipParseUrlTest?: boolean;
}

type TestCase = [TestName, TestParameter];

const emptyUrlBinder: UrlBinder = {
  host: [],
  query: emptyQueryBinder
};

const testCases: TestCase[] = [
  [
    'both host and query', {
      url: 'http://example.com:80/hoge?piyo=fuga',
      binder: {
        ...emptyUrlBinder,
        host: [['host', 'http://example.com:80/hoge']],
        query: {...emptyQueryBinder, basic: [['piyo', 'fuga']]}
      }
    }
  ],
  [
    'only query', {
      url: 'piyo=fuga',
      binder: {
        ...emptyUrlBinder,
        host: [['host', '']],
        query: {...emptyQueryBinder, basic: [['piyo', 'fuga']]}
      }
    }
  ]
];

describe.each(testCases)(
    'url-binder / %s', (_: string, p: TestParameter): void => {
      test('generateUrl', () => {
        if (p.skipGenerateUrlTest) {
          return;
        }

        const input = p.binder;
        const expected = p.url;

        const actual = generateUrl(input);
        expect(actual).toEqual(expected);
      });

      test('parseUrl', () => {
        if (p.skipParseUrlTest) {
          return;
        }

        const input = p.url;
        const expected = p.binder;

        const actual = parseUrl(input);
        expect(actual).toEqual(expected);
      });
    });
