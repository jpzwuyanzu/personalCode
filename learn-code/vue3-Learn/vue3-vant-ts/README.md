### 搭建一个vue3+typescript+vant3 的移动端项目

参考信息： https://blog.csdn.net/lgno2/article/details/114910284

报错信息： [plugin:vite:css] node.getIterator is not a function 

报错原因： postcss-px2rem不支持postcss8导致的， 我切换到postcss-pxtorem这个插件就ok了

#### 涉及的技术点

+ vite版本

+ vue3

+ ts

+ 集成路由

+ 集成vuex

+ 集成axios

+ 配置Vant3

+ 移动端适配

+ 请求代理

##### 1, 创建项目

npm init @vitejs/app my-vue-app --template vue-ts

##### 2, 创建 src/views/Home/index.vue 和 src/views/Login/index.vue

##### 3, 配置路由

 1， 安装依赖
 
 npm install vue-router@4 --save
 npm i sass -D

 2，在src/router/index.ts
 
 ```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
   {
       path: '/',
       name: 'home',
       meta: {
           title:'首页',
           keepAlive: true
       },
       component: () => import("../views/Home/index.vue")
   },
   {
       path: '/login',
       name: 'login',
       meta: {
           title: '登录',
           keepAlive: true
       },
       component: () => import('../views/Login/index.vue')
   }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router
 ```
 3, 在main.ts中挂载路由
 
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
createApp(App)
.use(router)
.mount('#app')
```


##### 4, 配置数据管理store

1,安装依赖

npm i vuex@next --save

2，在src下创建store目录，并在store下创建index.ts

```ts
import { createStore } from 'vuex'
export default createStore({
    state: {
        listData: {1:10},
        num: 10
    },
    mutations: {
        setData (state, payload) {
            state.listData = payload
        },
        addNum (state) {
            state.num = state.num + 10
        }
    },
    actions: {
        setData (contex, payload) {
            contex.commit('setData', payload)
        }
    },
    modules: {}
})

```

3,在main.ts挂载数据中心

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'


createApp(App)
.use(router)
.use(store)
.mount('#app')

```

##### 5, 使用vant3

1，安装依赖

npm i vant@next -S

vite版本不需要配置组件的按需加载，因为Vant 3.0 内部所有模块都是基于 ESM 编写的，天然具备按需引入的能力，但是样式必须全部引入137.2k

2，在main.ts挂载
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vant from 'vant'
import 'vant/lib/index.css' //全局引入样式
import 'lib-flexible'


createApp(App)
.use(router)
.use(store)
.use(vant)
.mount('#app')

```

##### 6,移动端适配

1， 安装依赖模块

npm install postcss-pxtorem --save-dev

npm install amfe-flexible --save

2.在vue的main.ts中引入amfe-flexible import ‘amfe-flexible’;

3，在项目根目录创建postcss.config.js 

```js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['last 2 versions']
    },
    'postcss-pxtorem': {
      rootValue: 37.5, //rootValue这个值可以自己配置，如过你设计稿的长度是750基数的可以将rootValue的值修改为75
      propList: ['*'],
      minPixelValue: 1,
      selectorBlackList: ['.threems'] // 过滤掉.threems-开头的class，不进行rem转换
    }
  }
}
```

##### 7, 封装axios请求

1，安装依赖

npm i -s axios

2, 在src创建utils文件夹,并在utils下创建request.ts

```ts
import axios from "axios";
const service = axios.create({
  baseURL : '',
  timeout: 5000 // request timeout
});
// 发起请求之前的拦截器
service.interceptors.request.use(
  config => {
    // 如果有token 就携带tokon
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers.common.Authorization = token;
    }
    return config;
  },
  error => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
 
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default service;
```

3,使用axios, 创建src/api/home.ts
```ts
import request from '../util/request'
export function getHomeData(params: any) {
    return request.post('/userInfo.json', params)
}

export function getBanner(params: any) {
    return request.get('/banner/', { params })
}
```

##### 8，配置请求代理

vite.config.ts
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', //打包路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') //设置别名
    }
  },
  server: {
    // port: 4000, //启动端口
    // open: true,
    proxy: {
      // '/api': {
      //   target: 'htpp://xxx.x.x',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  }
})

```