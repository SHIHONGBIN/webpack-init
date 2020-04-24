const  merge = require('webpack-merge');
const base = require('./webpack.base.config.js');

const path = require('path');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
//每次启动清理output

module.exports = merge(base, {
    mode: 'production',
    optimization: {
        minimizer: [
          //压缩js代码
            new UglifyJsPlugin({
              //启用文件缓存
                cache: true,
             //使用多线程并行运行提高构建速度
                parallel: true,
             //使用 SourceMaps 将错误信息的位置映射到模块
                sourceMap: true
            })
        ]
    },
    plugins:[
     //使用插件定义全局变量DEV
        new webpack.DefinePlugin({
            DEV:JSON.stringify('production')
        }),
    ],
      //公共js css抽取
  optimization: {
    splitChunks: {
        cacheGroups: {
          // 抽取来自 node_modules 文件夹下的第三方代码,优先级权重为10 主要是js
            vendor: {
                name: "vendor",
                test: /[\\/]node_modules[\\/]/,
                chunks: "all",
                priority: 10 // 优先级
            },
            // 抽取来自 src 文件夹下的代码，优先级权重为5 js/css都会抽取
            common: {
                name: "common",
                test: /[\\/]src[\\/]/,
                minSize: 1024,
                chunks: "all",
                priority: 5
            }
        }
    }
  }

});