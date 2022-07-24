const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const {defineConfig} = require('@vue/cli-service')
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // transpileDependencies: true,
    lintOnSave: false,
    filenameHashing: false,
    productionSourceMap: false,
    devServer: {
        port: 4001,
        proxy: {
            '/backend': {
                target: process.env.VUE_APP_SERVER,
                changeOrigin: true,
                // pathRewrite: {
                //     '^/system': '/'
                // }
            }
        }
    },
    // chainWebpack: (config) => {
    //     if (process.env.NODE_ENV === "production") {
    //         config.plugin("compressionPlugin").use(
    //             new CompressionWebpackPlugin({
    //                 test: /\.(js|css|less)$/, // 匹配文件名
    //                 threshold: 10240, // 对超过10k的数据压缩
    //                 minRatio: 0.8,
    //                 deleteOriginalAssets: true // 删除源文件
    //             })
    //         )
    //     }
    // },
    configureWebpack: {
        output: {
            filename: 'js/[name]-admin.js',
            chunkFilename: 'js/[name]-admin.js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name]-admin.css',
                chunkFilename: 'css/[name]-admin.css'
            })
        ]
    }
}
