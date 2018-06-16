import { parseUrl, UrlBinder, generateUrl } from "./url-binder";

describe('url-binder GenerateUrl test', () => {
    it('both host and query', () => {
        const input: UrlBinder = {
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            },
            host: [
                ['host', 'http://example.com:80/hoge']
            ]
        };

        const expected: string = 'http://example.com:80/hoge?piyo=fuga';

        const actual = generateUrl(input);

        expect(actual).toEqual(expected);
    });
    it('only query', () => {
        const input: UrlBinder = {
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            },
            host: [
                ['host', '']
            ]
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
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            },
            host: [
                ['host', 'http://example.com:80/hoge']
            ]
        };

        const actual = parseUrl(input);

        expect(actual).toEqual(expected);
    });
    it('only query', () => {
        const input = 'piyo=fuga';

        const expected: UrlBinder = {
            query: {
                basic: [
                    ['piyo', 'fuga']
                ],
                coord: []
            },
            host: [
                ['host', '']
            ]
        };

        const actual = parseUrl(input);

        expect(actual).toEqual(expected);
    });
});
