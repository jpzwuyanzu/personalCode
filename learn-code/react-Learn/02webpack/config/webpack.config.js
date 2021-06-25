//webpack是基于nodejs
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const path = require('path');
module.export = {
    //配置环境
    mode:'development', //production
    //默认打包index.js,项目入口 string 数组形式 对象形式
    // entry:'../src/index.js', 
    // entry:['../src/index.js'], 
    entry:"../src/index.js", 
    //项目出口文件
    output:{
        path:path.resolve(__dirname,'./dist'),  //打包路径
        filename:'index_bundle.js' //name
    },
    plugins: [new HtmlWebpackPlugin({
        title:'hello',
        filename:'index.html',
        template:resolve('public/index.html')
    })],
}