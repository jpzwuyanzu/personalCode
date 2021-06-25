### vue-ts

##### 适配步骤

###### 1，npm install amfe-flexible  postcss-px2rem-exclude -S  
```
amfe-flexible：是rem的适配插件。（例：750px == 10rem）
postcss-px2rem：负责将输入的px自动转为rem。
```
###### 2， 入口文件main.js里引入amfe-flexible
```js
import "amfe-flexible"
```
###### 3, package.json，增加以下配置：避免修改第三方组件库的样式
```json
"postcss": {
    "plugins": {
      "autoprefixer": {},
      "postcss-px2rem-exclude":{
          "remUnit": 75,
          "exclude":"/node_modules|floder_name/i"
      }
    }
  }
```
###### 4, public/index.html增加配置
```
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0,viewport-fit=cover"
```






## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
