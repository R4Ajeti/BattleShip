const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack')
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js'
        },
        extensions: ['.json', '.js', '.jsx']
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    }
});