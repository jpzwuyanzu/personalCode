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
# or
$ yarn add antd-mobile


