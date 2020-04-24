//引入webpack-merge插件进行合并
const merge = require('webpack-merge');
//引入webpack.base.conf.js文件
const base = require('./webpack.base.config.js');
//引入webpack
const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
//进行合并，将webpack.base.conf.js中的配置合并到这
module.exports = merge(base, {
   //模块参数
    mode: 'development',
    devServer:{
      // contentBase：告诉服务器从哪里提供内容
      contentBase: path.join(__dirname, 'dist'),
      // 当它被设置为true的时候对所有的服务器资源采用gzip压缩
      // 对JS，CSS资源的压缩率很高，可以极大得提高文件传输的速率，从而提升web性能
      compress: true,
      port: 9000,
      // 启用 webpack 的模块热替换特性()
      // hot: true,
      // 实现实时重载（实现自动刷新功能）默认情况下是 true 可以不用写。
      inline: true,
      // 如果你希望服务器外部可访问，指定使用一个 host。默认是 localhost(也就是你可以不写这个host这个配置属性)。
      host: 'localhost' 
    },
//启用source-map方便调试
    devtool: 'source-map',
    plugins: [
       //定义全局变量
        new webpack.DefinePlugin({
         //这里必须要解析成字符串进行判断，不然将会被识别为一个变量
            DEV: JSON.stringify('dev')
        }),
        new HtmlWebpackPlugin({
          title: '首页',
          //写入HTML的文件。默认为index.html。也可以指定一个子目录（例如：）assets/admin.html
          filename: 'index.html',
          template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(), // 需要结合 启用热替换模块(Hot Module Replacement)，也被称为 HMR
    ]
});