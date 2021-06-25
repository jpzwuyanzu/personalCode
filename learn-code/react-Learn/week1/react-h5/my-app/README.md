

### 创建react移动端项目

#####1， create-react-app apppage

#####2， yarn add react-app-rewired --save-dev
 
#####3， yarn add customize-cra --save-dev

#####4，修改package.json

 /* 修改package.json */
 
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
-   "eject": "react-scripts eject"
}

#####5，  yarn add babel-plugin-import --save

#####6， npm install postcss-pxtorem --save

#####7， 在根目录创建config-overrides.js,添加代码：
```js
const { override, fixBabelImports,addPostcssPlugins } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addPostcssPlugins([require('postcss-pxtorem')({
  rootValue: 16,
  propList: ['*']
  // propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
  // propWhiteList: []
```

#####8， 新建rem.js
```js
const baseSize = 32
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
```

#####9， 在src目录下的index.js引入rem.js

#####10， yarn add node-sass

#####11， 直接使用即可

##### 报错“ Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.”
+ 解决方法 直接指定安装postcss-pxtorem版本为5.1.1


## 目前缺失功能： 1， 图片懒加载 2， nprogress 3， 请求封装
## 4， 登录