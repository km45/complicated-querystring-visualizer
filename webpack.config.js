const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      'semantic-ui-react': 'semanticUIReact',
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
        title: 'react-studies(' + mode + ')',
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
