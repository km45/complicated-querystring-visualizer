const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const package = require('./package.json');

module.exports = (env, argv) => {
  const mode = argv.mode;

  const outputPath = path.resolve(__dirname, 'dist');
  const srcFavicon = path.resolve(__dirname, 'src', 'image', 'favicon.ico');
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
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
        }, {
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'source-map-loader',
          test: /\.js$/,
        }, {
          test: /\.css/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        }, {
          test: /\.(eot|png|svg|ttf|woff|woff2)$/,
          loader: 'url-loader',
        },
      ],
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'initial',
      },
    },
    output: {
      path: outputPath,
    },
    performance: {
      assetFilter: (assetFilename) => {
        if (assetFilename.endsWith('.css.map')) {
          return false;
        }
        if (assetFilename.endsWith('.js.map')) {
          return false;
        }
        if (assetFilename === 'vendor.css') {
          return false;
        }
        if (assetFilename === 'vendor.js') {
          return false;
        }

        return true;
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        favicon: srcFavicon,
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
          // Not use externals for following libraries:
          //   - ag-grid-react
          //   - pythonic
        ],
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: {
      extensions: [
        '.js',
        '.json',
        '.ts',
        '.tsx',
      ],
    },
    watchOptions: {
      poll: true,
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
