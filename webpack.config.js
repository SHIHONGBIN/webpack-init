const path = require('path')
// 引入html-webpack-plugin 插件 
const HtmlWebpackPlugin = require('html-webpack-plugin');
//每次启动清理output
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//抽离css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist/js'),
    //防止文件缓存
    filename: '[name].[hash].js'
  },
  module:{ 
    rules:[
      // test 说明了当前 loader 能处理那些类型的文件
      // use 则指定了 loader 的类型。
      // 注意：数组中的loader不能省略扩展名
      {
        test: /\.scss$/,
        // 注意 是sass-loader ，不是 scss-loader,顺序要对（不然报错）
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        // 注意 是sass-loader ，不是 scss-loader,顺序要对（不然报错）
        // use:[ 'style-loader', 'css-loader', 'less-loader']
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
        use:[
          {
            loader: 'url-loader',
             // limit=8192表示将所有小于8kb的图片都转为base64形式
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/,
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
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
  plugins:[
    new HtmlWebpackPlugin({
      title: '首页',
      //写入HTML的文件。默认为index.html。也可以指定一个子目录（例如：）assets/admin.html
      filename: 'index.html',
      template: './src/index.html'
    }),
    // 从 bundle 中提取文本（CSS）到单独的文件 减少加载时间 和js是平行加载的    
    new ExtractTextPlugin({
      //  提取css，并重名为带有 20位的hash值的唯一文件
      filename: '[name].[hash].css',
      // 将所有的独立文件模块（这里指的是css文件）合并成一个文件
      allChunks:true
    }),
    //每次清理output里面的dist文件夹
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 需要结合 启用热替换模块(Hot Module Replacement)，也被称为 HMR
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
}

