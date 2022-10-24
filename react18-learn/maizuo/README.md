### 1,创建react+ts H5项目

#### 1.1  create-react-app myapp --template typescript

### 2,安装sass包

#### 2.1 npm i --save sass

### 3,本地开发配置代理解决跨域问题

#### 3.1  创建src/setupProxy.js

#### 3.2  yarn add http-proxy-middleware

#### 3.3  setupProxy.js
```js
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        })
    );
    };
```


### 4,路由架构

#### 4.1 安装路由 yarn add react-router-dom --save-dev

#### 4.2创建对应的文件夹以及文件
src/hooks src/views src/utils src/api src/store src/components
src/router src/layout 等目录

#### 4.3构建 router/index.tsx文件
```tsx
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect';

const MRouter = () => {
    const element = useRoutes([
        {
          path: '/films',
          element: LazyLoad('films/Film'),
          children: [
              {
                  path: '',
                  element: <Redirect to={'/films/NowPlaying'} />
              },
              {
                  path: 'NowPlaying',
                  element: LazyLoad('films/NowPlaying')
              },
              {
                  path: 'comingSoon',
                  element: LazyLoad('films/ComingSoon')
              }
          ]  
        },
        {
            path: '/film/detail/:filmId',
            element: LazyLoad('films/Detail')
        },
        {
            path: '/cinema',
            element: LazyLoad('cinemas/Cinema')
        },
        {
            path: '/cinema/search',
            element: LazyLoad('cinemas/Search')
        },
        {
            path: '/city',
            element: LazyLoad('cinemas/City')
        },
        {
            path: '/cinema/detail/:filmId',
            element: LazyLoad('cinemas/Detail')
        },
        {
            path: '/center',
            element: <AuthComponent>{ LazyLoad('center/Center') }</AuthComponent>
        },
        {
            path: '/',
            element: <Redirect to="/films" />
        },
        {
            path: '*',
            element: LazyLoad('NotFound')
        }

    ])
    return element
}

//路由鉴权，判断是否登录
const AuthComponent = ({ children }: any) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login"/>
}

// 路由懒加载
const LazyLoad = (path: string) => {
    const Comp = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={ <>...加载中</> }>
            <Comp/>
        </React.Suspense>
    )
}

export default MRouter
```

#### 4.4改造App.tsx
```tsx
import React from 'react'
import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'
import MyTabBar from './components/MyTabBar';

export default function App() {
  return (
    <HashRouter>
      <MRouter></MRouter>
      <MyTabBar/>
    </HashRouter>
  )
}
```




### 5，导入antd-mobile

#### 5.1安装依赖 
$ npm install --save antd-mobile
 or
$ yarn add antd-mobile



#### 5.2 react px自动转rem,屏幕自适应

https://zhuanlan.zhihu.com/p/528295053

1. npm install @craco/craco --save

修改 package.json
```json
"scripts": {
    "start": "craco start",
    "build": "craco build"
    "test": "craco test"
}
```
2. 安装 yarn add postcss-pxtorem@5 lib-flexible@0.3 autoprefixer

在项目的根目录创建craco.config.js文件
```js
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
                            rootValue: 37.5, //375设计图设置为37.5 ， 750设计图设置为75
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
```

3. 项目入口文件index.ts中添加

* 最后重点 postcss-pxtorem 内联样式无法自动转化，特别要记住这个
```ts
import 'lib-flexible'
```
