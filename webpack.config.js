const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const package = require('./package.json');

module.exports = (env, argv) => {
  const mode = argv.mode;

  const outputJs = 'bundle.js';
  const outputPath = path.resolve(__dirname, 'dist', mode);
  const srcHtmlIndex = path.resolve(__dirname, 'src', 'html', 'index.html');
  const srcTsIndex = path.resolve(__dirname, 'src', 'ts', 'index.tsx');

  return {
    devtool: 'source-map',
    entry: srcTsIndex,
    externals: {
      'ag-grid-community': 'agGrid',
      'ag-grid-react': false,
      'pythonic': false,
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-dom-factories': false,
      'react-redux': 'ReactRedux',
      'redux': 'Redux',
      'semantic-ui-react': 'semanticUIReact',
      'ts-deepcopy': false,
      'typescript-fsa': false,
      'typescript-fsa-reducers': false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // '.ts' or '.tsx' extension
          loader: 'awesome-typescript-loader',
        }, {
          enforce: 'pre',
          loader: 'source-map-loader',
          test: /\.js$/, // '.js' extension
        },
      ],
    },
    output: {
      filename: outputJs,
      path: outputPath,
    },
    plugins: [
      new CleanWebpackPlugin([
        outputPath,
      ]),
      new HtmlWebpackPlugin({
        template: srcHtmlIndex,
        templateParameters: {
          htmlWebpackPlugin: {
            options: {
              title: package.name,
              mode,
              version: package.version,
            },
          },
        },
      }),
    ],
    resolve: {
      extensions: [
        '.js',
        '.json',
        '.ts',
        '.tsx',
      ],
    },
    // Disabled following settings defined in webpack.production.js
    // because it is maybe needless:
    // ```
    // performance: {
    //     hints: false
    // },
    //
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.NODE_ENV': JSON.stringify('production')
    //     })
    // ]
    // ```
  };
};
