const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const package = require('./package.json');

module.exports = (env, argv) => {
  const mode = argv.mode;

  const outputPath = path.resolve(__dirname, 'dist');
  const srcHtmlIndex = path.resolve(__dirname, 'src', 'html', 'index.html');
  const srcTsIndex = path.resolve(__dirname, 'src', 'ts', 'index.tsx');

  return {
    devServer: {
      host: '0.0.0.0',
    },
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
          return false;
        }
        if (assetFilename === 'vender.js') {
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
            entry: 'dist/ag-grid-community.min.noStyle.js',
            global: 'agGrid',
          },
          {
            module: 'react',
            entry: 'umd/react.production.min.js',
            global: 'React',
          },
          {
            module: 'react-dom',
            entry: 'umd/react-dom.production.min.js',
            global: 'ReactDOM',
          },
          {
            module: 'react-redux',
            entry: 'dist/react-redux.min.js',
            global: 'ReactRedux',
          },
          {
            module: 'redux',
            entry: 'dist/redux.min.js',
            global: 'Redux',
          },
          {
            module: 'semantic-ui-react',
            entry: 'dist/umd/semantic-ui-react.min.js',
            global: 'semanticUIReact',
          },
          // Not use externals for following libraries:
          //   - ag-grid-react
          //   - pythonic
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
