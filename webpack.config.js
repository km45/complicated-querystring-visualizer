const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const package = require('./package.json');

module.exports = (env, argv) => {
  const mode = argv.mode;

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
    optimization: {
      splitChunks: {
        name: 'vender',
        chunks: 'initial',
      },
    },
    output: {
      path: outputPath,
    },
    performance: {
      assetFilter: (assetFilename) => {
        if (assetFilename.endsWith('.js.map')) {
          // disable performance hints for source map
          return false;
        }
        if (assetFilename === 'vender.js') {
          // disable performance hints for non-standard libraries
          return false;
        }

        return true;
      },
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
        enabled: mode === 'development',
        externals: [
          {
            module: 'ag-grid-community',
            global: 'agGrid',
            entry: 'dist/ag-grid-community.min.noStyle.js',
          },
          {
            module: 'react',
            global: 'React',
            entry: 'umd/react.production.min.js',
          },
          {
            module: 'react-dom',
            global: 'ReactDOM',
            entry: 'umd/react-dom.production.min.js',
          },
          {
            module: 'react-redux',
            global: 'ReactRedux',
            entry: 'dist/react-redux.min.js',
          },
          {
            module: 'redux',
            global: 'Redux',
            entry: 'dist/redux.min.js',
          },
          {
            module: 'semantic-ui-react',
            global: 'semanticUIReact',
            entry: 'dist/umd/semantic-ui-react.min.js',
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
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.NODE_ENV': JSON.stringify('production')
    //     })
    // ]
    // ```
  };
};
