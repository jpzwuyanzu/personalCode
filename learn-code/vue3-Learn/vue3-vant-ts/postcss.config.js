module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['last 2 versions']
    },
    'postcss-pxtorem': {
      rootValue: 37.5, 
      propList: ['*'],
      minPixelValue: 1,
      selectorBlackList: ['.threems'] // 过滤掉.threems-开头的class，不进行rem转换
    }
  }
}