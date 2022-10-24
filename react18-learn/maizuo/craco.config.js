const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem')
module.exports = {
    style: {
        postcss: {
            mode: 'extends',
            loaderOptions: {
                postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                        autoprefixer(),
                        pxtorem({
                            rootValue: 37.5,
                            unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
                            propList: ["*"],
                            //unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
                            //propList: ['*'], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
                            //selectorBlackList: [],// （数组）要忽略并保留为 px 的选择器。
                            //replace: true, // 替换包含 rems 的规则，而不是添加回退。
                            mediaQuery: false,  // 允许在媒体查询中转换 px
                            minPixelValue: 0, // 最小的转化单位
                            exclude: /node_modules/i // 要忽略并保留为 px 的文件路径
                        }),
                    ],
                },
            },
        },
    },
};