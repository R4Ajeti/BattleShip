var webpack = require('webpack')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index'),
    watch: true,
    module: {
        rules: [{
            test: /.jsx?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            loader: 'babel-loader',
            query: {
                presets: [
                    ["@babel/env", {
                        "targets": {
                            "browsers": "last 2 chrome versions"
                        }
                    }]
                ]
            },

        },
        {
            test: /.css?$/,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
        {
            test: /\.(jpe?g|png|gif)$/i,
            loader: "file-loader",
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/images/'
                //the images will be emited to dist/assets/images/ folder
            }
        },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!php*', '!php/**/*', '!.git*', '!.git/**/*', '!robots.txt'],
        }),
        new HtmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        )
    ],
    performance: { hints: false }
};