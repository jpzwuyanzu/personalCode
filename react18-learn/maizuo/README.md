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
                            rootValue: 75, //375设计图设置为37.5 ， 750设计图设置为75
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

### 6,使用nprogress 组件

#### 6.1 安装 npm i @types/nprogress nprogress

#### 6.2 封装Loading.tsx 
```tsx
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function Loading() {
    useEffect(() => {
        NProgress.configure({ showSpinner: false }); //隐藏左侧圆圈loading
        NProgress.start()
        return () => {
            NProgress.done()
        }
    } ,[])
    return (
        <div>
            
        </div>
    )
}
```
```css
#nprogress, .bar {
  background: #ff5f16 !important;
}
```




### 7 配置状态管理

1，安装依赖
npm install @reduxjs/toolkit react-redux  redux-persist

2，创建slice文件
```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//定义接口
interface IShowTabState {
    status: boolean
}

// 定义初始状态
const initialState: IShowTabState = {
    status: true
}

const { actions, reducer: TabBarReducer } = createSlice({
    name: 'showtab',
    initialState: initialState,
    reducers: {
        switchTabBar: (state: IShowTabState) => {
            state.status = !state.status;
        }
    }
})

export const { switchTabBar } = actions;

export default TabBarReducer;
```
3，创建store/index.ts
```ts
import { configureStore } from '@reduxjs/toolkit'
import TabBarReducer from './tabbar.slice';

//配置redux数据持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage,
    blcklist: ['NotFound']
}
const persistTabBarReducer = persistReducer(persistConfig, TabBarReducer);

//配置store
const store = configureStore({
    reducer: {
        'showTabBar': persistTabBarReducer
    },
    // 配置中间件
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false })
    ]
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default store;
```
4，封装dispatch和selector
hook/hooks.ts
```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './../store/index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```
5，注入状态管理到ui组件中 src/index.ts
```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'lib-flexible'
import './index.css';
import App from './App';
import store from './store/index'
import { Provider } from 'react-redux'
import { persistor } from './store/index';
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
         <App />
      </PersistGate>
    </Provider>
 </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

### 8,登录模块开发
#### 8,1 

