import { generateUrl, parseUrl, UrlBinder } from './url-binder';

describe('url-binder GenerateUrl test', () => {
    it('both host and query', () => {
        const input: UrlBinder = {
            host: [
                ['host', 'http://example.com:80/hoge']
            ],
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            }
        };

        const expected: string = 'http://example.com:80/hoge?piyo=fuga';

        const actual = generateUrl(input);

        expect(actual).toEqual(expected);
    });
    it('only query', () => {
        const input: UrlBinder = {
            host: [
                ['host', '']
            ],
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            }
        };

        const expected: string = 'piyo=fuga';

        const actual = generateUrl(input);

        expect(actual).toEqual(expected);
    });
});

describe('url-binder ParseUrl test', () => {
    it('both host and query', () => {
        const input = 'http://example.com:80/hoge?piyo=fuga';

        const expected: UrlBinder = {
            host: [
                ['host', 'http://example.com:80/hoge']
            ],
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            }
        };

        const actual = parseUrl(input);

        expect(actual).toEqual(expected);
    });
    it('only query', () => {
        const input = 'piyo=fuga';

        const expected: UrlBinder = {
            host: [
                ['host', '']
            ],
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            }
        };

        const actual = parseUrl(input);

        expect(actual).toEqual(expected);
    });
});
