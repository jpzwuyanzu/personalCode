# Vue 3 + Vite + ant-design-vue 3.2.2

## 核心库版本
```json
{
  "name": "vue3-cms",
  "private": true,
  "version": "0.0.0",
  "author": {
    "name": "dahe"
  },
  "scripts": {
    "dev": "cross-env NODE_ENV=development vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "ant-design-vue": "^3.2.2",
    "axios": "^0.27.2",
    "js-cookie": "^3.0.1",
    "nprogress": "^0.2.0",
    "vue": "^3.2.25",
    "vue-router": "^4.0.13",
    "vuex": "^4.0.2"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^2.3.1",
    "cross-env": "^7.0.3",
    "sass": "^1.51.0",
    "unplugin-auto-import": "^0.7.1",
    "unplugin-vue-components": "^0.19.3",
    "vite": "^2.9.7"
  }
}
```

## 目录结构
```txt
vue3-cms
/api 所有api请求
/asstes 所有图片等资源文件
/componets 自定义组件
/layout 布局相关
/router 路由文件
/sotre 全局状态管理
/style 样式文件
/utils 公共库,现有cookie封装以及axios封装
/views 页面文件
/App.vue 路由入口
/main.js 入口文件
/index.html html模版
/package.json json文件
/vite.config.js vite相关的配置
```

## 功能
```txt
1.登录
2.左侧菜单根据用户角色动态加载对应的权限菜单
3.面包屑
4.退出登录
5.对于登录状态的校验以及路由拦截处理
6.菜单收缩展开
...
```

