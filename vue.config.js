/*
 * @Descripttion: 
 * @version: 
 * @Author: zkc
 * @Date: 2023-05-04 16:33:32
 * @LastEditors: zkc
 * @LastEditTime: 2023-07-13 14:25:21
 */
const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  publicPath: process.env.NODE_ENV == 'development' ? '/' : '/wkkhtml/',
  outputDir: 'wkkhtml',
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0",
    port: 9011, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动预览器
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }

  },

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
      })
    ],
    module: {
      unknownContextCritical: false,
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['remove-flow-types-loader'],
        },
      ]
    }


  },
  chainWebpack(config) {
    config.plugin('html').tap((args) => { //标题
      args[0].title = '全国尾矿库';
      return args;
    })
  },
})
