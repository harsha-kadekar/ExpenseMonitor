const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const extractCss = new ExtractTextPlugin({ filename: 'main.css'});

module.exports = {
    entry: './src/app/app.module.js',
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.html', '.css', '.jpg', '.png', '.gif'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeAttributeQuotes: false,
                    caseSenitive: true,
                    customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
                    customAttrAssign: [/\)?\]?=/]
                }
            },
            {
                test:/\.css$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'images/[hash]-pname].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            'title': 'Expanse Monitor',
            template: './src/index.html',
            filename: 'index.html'
        }),
        extractCss
    ]
};