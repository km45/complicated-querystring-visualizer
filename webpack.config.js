const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode;
  return {
    entry: './src/ts/index.tsx',
        output: {filename: 'bundle.js', path: __dirname + '/dist/' + mode},

        // Enable sourcemaps for debugging webpack's output.
        devtool: 'source-map',

        resolve: {
          // Add '.ts' and '.tsx' as resolvable extensions.
          extensions: ['.ts', '.tsx', '.js', '.json']
        },

        module: {
          rules:
              [
                // All files with a '.ts' or '.tsx' extension will be handled by
                // 'awesome-typescript-loader'.
                {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},

                // All output '.js' files will have any sourcemaps re-processed
                // by 'source-map-loader'.
                {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
              ]
        },

        externals: {
          'ag-grid-community': 'agGrid',
          'ag-grid-react': false,
          'pythonic': false,
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react-dom-factories': false,
          'semantic-ui-react': 'semanticUIReact'
        },

        plugins: [
          new CleanWebpackPlugin([__dirname + '/dist/' + mode]),
          new HtmlWebpackPlugin({
            template: __dirname + '/src/html/index.html',
            title: 'react-studies(' + mode + ')'
          })
        ]

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
  }
}