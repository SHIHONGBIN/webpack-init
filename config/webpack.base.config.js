const path = require('path');
//清除build/dist文件夹文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//生成创建Html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//css压缩
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
//压缩js文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//引入webpack
const webpack = require('webpack');
//抽离css
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// const NODE_ENV=process.env.NODE_ENV;



// console.log(NODE_ENV)


module.exports = {
//webpack 入口文件
    entry: './src/js/main.js',
    //webpack 输出文件配置
    output: {
      path: path.resolve(__dirname, 'dist'),
      //防止文件缓存
      filename: '[name].[hash].js'
    },
  //配置插件
    plugins: [
    //使用插件清除dist文件夹中的文件
        new CleanWebpackPlugin({
            path: './dist'
        }),
    //使用插件生成Html入口文件
        new HtmlWebpackPlugin({
         //模板文件路径
            template: "./src/index.html",
        //模板文件名
            filename: "index.html",
            minify: {
                removeAttributeQuotes: true, //删除双引号,
                collapseWhitespace: true,    //压缩成一行，
            },
            hash: true
        }),
          // 从 bundle 中提取文本（CSS）到单独的文件 减少加载时间 和js是平行加载的    
      new ExtractTextPlugin({
        //  提取css，并重名为带有 20位的hash值的唯一文件
        filename: '[name].[hash].css',
        // 将所有的独立文件模块（这里指的是css文件）合并成一个文件
        allChunks:true
      }),
    ],
    resolve: {
        // modules: [path.resolve('node_modules')],//只在当前目录下查找
        alias: { //别名
            'bootstrap': 'bootstrap/dist/css/bootstrap.css',
        },
        // mainFields: ['style', 'main'],//优先寻找style，
        // mainFiles: [],//入口文件的名字,默认index.js
        // extensions: ['js', 'css', 'json', 'vue']//扩展名顺序
    },
   //loader加载器模块配置
    module: {
        rules: [
          {
            test: /\.scss$/i,
            // 注意 是sass-loader ，不是 scss-loader,顺序要对（不然报错）
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
          },
          {
            test: /\.less$/i,
            // 注意 是sass-loader ，不是 scss-loader,顺序要对（不然报错）
            // use:[ 'style-loader', 'css-loader', 'less-loader']
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'less-loader']
            })
          },
          {
            test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/i,
            use:[
              {
                loader: 'url-loader',
                 // limit=8192表示将所有小于8kb的图片都转为base64形式
                options: {
                  limit: 8192,
                  outputPath: 'img/'
                },
                
              }
            ]
          },
          {
            test: /\.js$/i,
            exclude: /(node_modules)/,
            use:{
              loader: 'babel-loader',
              options: {
                presets: ['env'],
                plugins: ['transform-runtime']
              }
            }
          },
          {
            test: /\.css$/i,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
            {
                test: /\.html$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
};