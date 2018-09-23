const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',

    output: {
        path: __dirname + "/dist/development"
    },

    plugins: [
        new CleanWebpackPlugin([__dirname + "/dist/development"]),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/html/index.html',
            title: 'react-studies(development)'
        })
    ]
});