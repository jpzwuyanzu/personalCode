const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack'); //访问内置的插件
// console.log(webpack.optimize)
module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js',
    vender: './src/lib/jquery.min.js'
  },
  output: { // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: "[name].js", // string    filename: "[name].js", // 用于多个入口点(entry point)（出口点？）
    // filename: "[chunkhash].js", // 用于长效缓存
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）

    publicPath: "./", 
  },
  plugins: [
    new webpack.ProgressPlugin(), // 显示打包的进度
    new CleanWebpackPlugin({ dry: true }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "static", context: "src", }
      ]
    }),
    new HtmlWebpackPlugin({
      base:'./public',
      template: './public/index.html',
      title: 'hahaha',
      inject: 'head',
      // publicPath: 'aaaa',
      scriptLoading: 'blocking',
      favicon: './public/favicon.ico',
      meta: {}
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          // { loader: 'style-loader'},
          { loader: MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', 
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader']
        use: [
          // { loader: 'style-loader'},
          { loader: MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', 
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader'}
        ]
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader']
        use: [
          // { loader: 'style-loader'},
          { loader: MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', 
            options: {
              modules: true
            }
          },
          { loader: 'less-loader'}
        ]
      },
      {
        test: /\.stylus$/,
        // use: ['style-loader', 'css-loader']
        use: [
          // { loader: 'style-loader'},
          { 
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', 
            options: {
              modules: true
            }
          },
          { loader: 'stylus-loader'}
        ]
      }
    ]

  }
}