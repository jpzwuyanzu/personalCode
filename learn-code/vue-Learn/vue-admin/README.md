# vue-admin后台管理pc端
 
 ## 项目使用技术 vue + vuex + vue-router + element-ui + axios 

## 项目主要包含登录，保存登录信息， 以及模拟获取菜单并渲染，路由配置，钩子拦截并判断登录状态， 退出登录，以及ui的使用， axios请求封装

## 项目目录结构简单介绍
 src/
   api --- 请求的封装
   assets ---图片资源以及样式
   components ---组件
   router --路由配置
   util ---公共方法
   views ---页面
   App.vue
   main.js ---入口文件
   instructions.js --自定义指令，控制权限
   vue.config.js -- 配置文件

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
