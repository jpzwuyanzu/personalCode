# 概念

*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是高度可配置的。

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)



# 安装

```bash
cnpm i webpack webpack-cli -g
cnpm i webpack webpack-cli@3 -S

// 打开package.json 查看版本

"dependencies": {
    "webpack": "^5.19.0",
    "webpack-cli": "^4.4.0"
  }
```



# 模式

```js
  mode: "production", // enable many optimizations for production builds
  mode: "development", // enabled useful tools for development
  mode: "none", // no defaults
```



# 入口

在 webpack 配置中有多种方式定义 `entry` 属性

## demo

```js
// string | object | array  
entry: "./app/entry",   
entry: ["./app/entry1", "./app/entry2"],
entry: {
  a: "./app/entry-a",
  b: ["./app/entry-b1", "./app/entry-b2"]
},
```

***向* `entry` *属性传入「文件路径(file path)数组」将创建***“多个主入口(multi-main entry)”***。***

***在你想要多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。***

对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。

**“可扩展的 webpack 配置”***是指，可重用并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如* [webpack-merge](https://github.com/survivejs/webpack-merge)*）将它们合并。*

## 常见场景

#### 分离 应用程序(app) 和 第三方库(vendor) 入口

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

### 多页面应用程序

**webpack.config.js**

```javascript
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

# 输出output

配置 `output` 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个`入口`起点，但只指定一个`输出`配置。

```js
output: { // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: "[name].js", // string    filename: "[name].js", // 用于多个入口点(entry point)（出口点？）

    publicPath: "/", 
  },
```

# 插件

## 页面插件 html-webpack-plugin

### 安装

```bash
// webpack5
npm i --save-dev html-webpack-plugin@next
yarn add --dev html-webpack-plugin@next

// webpack 4
npm i --save-dev html-webpack-plugin
yarn add --dev html-webpack-plugin

```

## 配置项

| Name                     | Type                        | Default                                               | Description                                                  |
| ------------------------ | --------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| **`title`**              | `{String}`                  | `Webpack App`                                         | 不指定模版默认生成的页面的 标题.                    <%= htmlWebpackPlugin.options.title %> |
| **`filename`**           | `{String}`                  | `'index.html'`                                        | 输出的文件的名称，默认为index.html                           |
| **`template`**           | `{String}`                  | ``                                                    | 指定页面的模版路径，可以使用相对或者绝对路径                 |
| **`templateContent`**    | `{string|Function|false}`   | false                                                 | 可以写行内的页面模版代替template内容                         |
| **`templateParameters`** | `{Boolean|Object|Function}` | `false`                                               | 页面的参数信息                                               |
| **`inject`**             | `{Boolean|String}`          | `true`                                                | `是否自动引入js文件，以及引入的位置true || 'head' || 'body' || false` |
| **`publicPath`**         | `{String|'auto'}`           | `'auto'`                                              | 引入导出的js的路径前缀                                       |
| **`scriptLoading`**      | `{'blocking'|'defer'}`      | `'blocking'`                                          | 现代浏览器支持非阻塞javascript加载（`'defer``），以提高页面启动性能。 |
| **`favicon`**            | `{String}`                  | ``                                                    | 设置导出的文件的小图标                                       |
| **`meta`**               | `{Object}`                  | `{}`                                                  | 设置meta属性E.g. `meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}` |
| **`base`**               | `{Object|String|false}`     | `false`                                               | 导出的页面中引入base标签                                     |
| **`minify`**             | `{Boolean|Object}`          | `true` if `mode` is `'production'`, otherwise `false` | 生产环境自动压缩页面，其余的不压缩                           |
| **`hash`**               | `{Boolean}`                 | `false`                                               | 如果“true”，则将唯一的“webpack”编译哈希附加到所有包含的脚本和CSS文件中。这对于破坏缓存非常有用 |
| **`cache`**              | `{Boolean}`                 | `true`                                                | 仅当文件已更改时才发出该文件                                 |
| **`showErrors`**         | `{Boolean}`                 | `true`                                                | 错误详细信息将写入HTML页面                                   |
| **`chunks`**             | `{?}`                       | `?`                                                   | 允许您只添加一些块（例如，只添加单元测试块）                 |
| **`chunksSortMode`**     | `{String|Function}`         | `auto`                                                | 允许控制在将块包含到HTML中之前如何对其进行排序。Allowed values are `'none' | 'auto' | 'manual' | {Function}` |
| **`excludeChunks`**      | `{Array.<string>}`          | ``                                                    | 允许您跳过某些块（例如不添加单元测试块）                     |
| **`xhtml`**              | `{Boolean}`                 | `false`                                               | `false`If`true`将`link`标记呈现为自动关闭（符合XHTML）       |

如果在使用模版时还想设置自定义的值，可以在模版中直接 通过如下语句指定

```ejs
<%= htmlWebpackPlugin.options.title %>
```

```js
plugins: [
    new webpack.ProgressPlugin(), // 显示打包的进度
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
```

## clean-webpack-plugin

```
npm install --save-dev clean-webpack-plugin
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
    new webpack.ProgressPlugin(), // 显示打包的进度
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({})
  ]
```

拓展

```
new CleanWebpackPlugin({
    // Simulate the removal of files
    // 模拟删除文件
    // default: false
    dry: true,
 
    // Write Logs to Console
    // (Always enabled when dry is true)
    // 将日志写入控制台
    // default: false
    verbose: true,
 
    // Automatically remove all unused webpack assets on rebuild
    // 重建时自动删除所有未使用的网页包资产
    // default: true
    cleanStaleWebpackAssets: false,
 
    // Do not allow removal of current webpack assets
    // 不允许删除当前网页包资产
    // default: true
    protectWebpackAssets: false,

});
```

## copy-webpack-plugin

```
npm install copy-webpack-plugin --save-dev
```



```js
const CopyPlugin = require("copy-webpack-plugin");
plugins: [
    new webpack.ProgressPlugin(), // 显示打包的进度
    new CleanWebpackPlugin({ dry: true }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "static" },
        // { from: "assets", to: "static", context: "src", }
      ]
    }),
    new HtmlWebpackPlugin({ })
  ]
```

| Name                                                         | Type                | Default                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| [`from`](https://www.npmjs.com/package/copy-webpack-plugin#from) | `{String}`          | `undefined`                                   | 从中复制文件的全局或路径。相对路径或者绝对路径               |
| [`to`](https://www.npmjs.com/package/copy-webpack-plugin#to) | `{String|Function}` | `compiler.options.output`                     | 输出路径                                                     |
| [`context`](https://www.npmjs.com/package/copy-webpack-plugin#context) | `{String}`          | `options.context || compiler.options.context` | 确定如何解释“from”路径的路径。                               |
| [`globOptions`](https://www.npmjs.com/package/copy-webpack-plugin#globoptions) | `{Object}`          | `undefined`                                   | [Options](https://github.com/sindresorhus/globby#options) 传递到包含“ignore”选项的全局模式匹配库。 |
| [`filter`](https://www.npmjs.com/package/copy-webpack-plugin#filter) | `{Function}`        | `undefined`                                   | 允许筛选复制assets.                                          |
| [`toType`](https://www.npmjs.com/package/copy-webpack-plugin#totype) | `{String}`          | `undefined`                                   | 确定什么是“to”选项-目录、文件或模板。                        |
| [`force`](https://www.npmjs.com/package/copy-webpack-plugin#force) | `{Boolean}`         | `false`                                       | 覆盖已在中的文件`汇编.资产`（通常由其他插件/加载程序添加）   |
| [`transform`](https://www.npmjs.com/package/copy-webpack-plugin#transform) | `{Object}`          | `undefined`                                   | 允许修改文件内容。启用“转换”缓存。您可以使用`{transform:{cache:{key:'my cache key'}}}`使缓存失效。 |
| [`noErrorOnMissing`](https://www.npmjs.com/package/copy-webpack-plugin#noerroronmissing) | `{Boolean}`         | `false`                                       | 不会对丢失的文件生成错误。                                   |
| [`info`](https://www.npmjs.com/package/copy-webpack-plugin#info) | `{Object|Function}` | `undefined`                                   | 允许添加assets信息。                                         |

## 压缩js代码  UglifyJsPlugin

如果是webpack5以前需要使用以下语句进行代码的压缩

```
new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
```

webpack5的话。可以通过 设置mode属性会自动压缩代码

# 解析器 模块配置

## 解析样式相关模块

```bash
cnpm i style-loader css-loader node-sass sass-loader less less-loader stylus stylus-loader -S
```



```js
module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          { loader: 'style-loader'},
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
          { loader: 'style-loader'},
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
          { loader: 'style-loader'},
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
          { loader: 'style-loader'},
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
```

## 抽离css文件

```
npm install --save-dev mini-css-extract-plugin
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
plugins: [
    new webpack.ProgressPlugin(), // 显示打包的进度
    new CleanWebpackPlugin({ dry: true }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
    }),
    new CopyPlugin({}),
    new HtmlWebpackPlugin({})
  ],
  module: {
    rules: [
      ...,
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
```

## 封装解析器

```js
const loaderUse = (fileLoader) => {
  return [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    fileLoader
  ]
} 

module: {
    rules: [
      {
        test: /\.css$/,
        use: loaderUse('css-loader')
      },
      {
        test: /\.scss$/,
        use: loaderUse('sass-loader')
      },
      {
        test: /\.less$/,
        use: loaderUse('less-loader')
      },
      {
        test: /\.stylus$/,
        use: loaderUse('stylus-loader')
      }
    ]
```





## 自动补全css

```
yarn add postcss postcss-loader autoprefixer postcss-preset-env -D
```

创建postcss.config.js

```js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 100 versions']
    })
  ]
}
```

```js
const loaderUse = (fileLoader) => {
  return [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'postcss-loader',
    fileLoader
  ]
} 
```

如果不设置 外部配置文件

```js
const loaderUse = (fileLoader) => {
  return [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'autoprefixer',
              {
                overrideBrowserslist: ['last 100 versions']
              }
            ],
            [
              'postcss-preset-env',
              {
                // Options
              }
            ]
          ]
        }
      }
    },
    fileLoader
  ]
} 
```

## 图片资源处理

```
yarn add file-loader url-loader -S
```

```js
module: {
	rules: [
		...,
		{
        test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
        use: [
          { 
            loader: 'url-loader',
            options: {
              // 如果设置的值足够大，显示base64图片地址（内存中）
              // 如果设置的值足够小，显示图片的地址
              limit: 2048, // 单位为字节
    					outputPath: '../images' // 基于css的文件的路径 --- 也是引入图片的路径
            }
          }
        ]
      }
	]
}
```



# 开发服务器设置 

```
yarn add webpack-dev-server -S
```

```js
devServer: {
    compress: true,
    host: "0.0.0.0", // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问
    port: 9000,
    open: true,
    proxy: {
      // '/api': 'https://gp.adouzaizai.top/api'
      '/api': {
        target: 'https://gp.adouzaizai.top/api',
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
```

# 处理js

```
yarn add @babel/core @babel/preset-env babel-loader -S
```

```
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
    	presets: ['@babel/preset-env']
    }
  }
}
```

但是如果遇到js的高级语法

```
cnpm i @babel/plugin-proposal-class-properties -S
cnpm i @babel/plugin-proposal-decorators -S
cnpm i @babel/plugin-transform-runtime @babel/runtime -S
```

```js
{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',// 处理async await
              [
                '@babel/plugin-proposal-decorators', // 装饰器
                {
                  legacy: true
                }
              ],
              [
                '@babel/plugin-proposal-class-properties', // 处理类的静态属性 state = { a: 1}
                {
                  loose: true
                }
              ],
              
            ]
          }
        }
      }
```

如果遇到 浏览器解析不了的语句，不兼容老版本的写法。-----  垫片

```
cnpm i @babel/polyfill -S
```



* 1.入口处引入

```
import '@babel/polyfill'
```

* 2.webpack的配置文件的entry入口处

```js
entry: {
    // app: './src/main.js',
    app: ['@babel/polyfill', './src/main.js'],
    vendors: './src/lib/jquery.min.js',
    // vendors: ['./src/lib/jquery.min.js', './src/lib/aaaa.js']
  },
```

* 3.添加配置项

```js
{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'],
            presets: [
              // +++++++++++++++++++++++++++++++++
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage'
                }
              ]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',// 处理async await
              [
                '@babel/plugin-proposal-decorators', // 装饰器
                {
                  legacy: true
                }
              ],
              [
                '@babel/plugin-proposal-class-properties', // 处理类的属性
                {
                  loose: true
                }
              ],
              
            ]
          }
        }
      }
```

为什么要使用垫片

**Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。举个栗子，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。**

```
var obj = Object.assign({}, { a: 1}, {b:2})
console.log(obj)
```

设置成开发环境，打包项目，查询关键词，设置了 垫片 assign 有35个，不设置只有 12个



