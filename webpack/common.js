const path = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path(__dirname, '..', 'src', 'index.tsx'), //tsx
    },
    output: {
        // filename: '[name].[contenthash:6].js',
        filename: 'bundle.js',
        path: path(__dirname, '..', 'build'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path(__dirname, '..', 'public', 'index.html'),
        }),
    ],
};