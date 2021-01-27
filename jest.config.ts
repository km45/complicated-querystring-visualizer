import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    'transform': {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    'roots': [
        '<rootDir>/src',
    ],
    'testURL': 'http://localhost/',
};
export default config;
