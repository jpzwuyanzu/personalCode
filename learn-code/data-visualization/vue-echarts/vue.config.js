
const Path = require('path')
module.exports = {
    publicPath: './',
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    //webpack原生的配置选项
    configureWebpack: {
        resolve: {
            alias: {
                '@': Path.resolve(__dirname, 'src/components')
            }
        }
    }
}