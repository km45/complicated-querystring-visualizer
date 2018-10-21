const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

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
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'ag-grid-community',
            global: 'agGrid',
            entry: {
              path: 'https://unpkg.com/ag-grid-community@19.0/dist/ag-grid-community.min.noStyle.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
          },
          {
            module: 'react',
            global: 'React',
            entry: {
              path: 'https://unpkg.com/react@16.5/umd/react.production.min.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
          },
          {
            module: 'react-dom',
            global: 'ReactDOM',
            entry: {
              path: 'https://unpkg.com/react-dom@16.5/umd/react-dom.production.min.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
          },
          {
            module: 'react-redux',
            global: 'ReactRedux',
            entry: {
              path: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.7/react-redux.min.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
          },
          {
            module: 'redux',
            global: 'Redux',
            entry: {
              path: 'https://unpkg.com/redux@4.0/dist/redux.min.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
          },
          {
            module: 'semantic-ui-react',
            global: 'semanticUIReact',
            entry: {
              path: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui-react/0.82.5/semantic-ui-react.min.js',
              attributes: {
                crossorigin: 'anonymous',
              },
            },
          },
          // Not use externals for following libraries:
          //   - ag-grid-react
          //   - pythonic
          //   - react-dom-factories
          //   - ts-deepcopy
          //   - typescript-fsa
          //   - typescript-fsa-reducers
        ],
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
