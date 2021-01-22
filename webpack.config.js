const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {ESBuildMinifyPlugin, ESBuildPlugin} = require('esbuild-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const package = require('./package.json');

module.exports = (env, argv) => {
  const mode = argv.mode;

  const outputPath = path.resolve(__dirname, 'dist');
  const srcFavicon = path.resolve(__dirname, 'src', 'image', 'favicon.ico');
  const srcHtmlIndex = path.resolve(__dirname, 'src', 'html', 'index.html');
  const srcTsIndex = path.resolve(__dirname, 'src', 'ts', 'index.tsx');

  const targetEnvironment = 'es2018';

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
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: targetEnvironment,
          },
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
      minimize: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: targetEnvironment,
        }),
      ],
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
      new ESBuildPlugin(),
      new HardSourceWebpackPlugin(),
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
