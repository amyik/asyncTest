const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './webapp/src/index.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, './webapp/src/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: '**/*.html',
                    context: 'webapp/src'
                },
            ],
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Output Management'
        // })
    ],
    devtool: 'inline-source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: "/",
        // host: "dev.domain.com",
        overlay: true,
        port: 8081,
        stats: "errors-only",
        historyApiFallback: true,
    }
};