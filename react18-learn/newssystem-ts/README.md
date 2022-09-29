### 1,创建react+ts 项目

#### 1.1 create-react-app myapp --template typescript

### 2,安装sass包

#### 2.1  npm i --save sass 

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

#### 4.2 封装Redirect组件
src/components/Redirect.tsx
```tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = ({ to }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: true })
    },[])
    return null
}

export default Redirect
```

#### 4.3 src/router/index.tsx

```tsx
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
const MRouter = () => {
    const element = useRoutes([
        {
            path: '/login',
            element: LazyLoad('login/Login.tsx')
        },
        {
            path: '/',
            element: <AuthComponent>{ LazyLoad('newssandbox/NewsSandBox.tsx') }</AuthComponent>,
            children: [
                {
                    path: '',
                    element: <Redirect to="/home"/>
                },
                {
                    path: 'home',
                    element: LazyLoad('home/Home.tsx')
                },
                {
                    path: 'user-mannage/list',
                    element: LazyLoad('user-mannage/UserList.tsx')
                },
                {
                    path: 'right-mannage/right-list',
                    element: LazyLoad('right-mannage/RightList.tsx')
                },
                {
                    path: 'right-mannage/role-list',
                    element: LazyLoad('right-mannage/RoleList.tsx')
                }
            ]
        },
        {
            path: '/',
            element: <Redirect to="/"/>
        },
        {
            path: '*',
            element: LazyLoad('404/NotFound.tsx')
        }
    ])
    return (element)
}

export default MRouter

//路由鉴权，判断是否登录，如果未登录重定向到登录页面
const AuthComponent = ({ children }: any) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login"/>
}

//路由懒加载
const LazyLoad = (path: string) => {
    const Com = React.lazy(() => import(`../views/${path}`));
    return (
        <React.Suspense fallback={ <>加载中...</> }>
            <Com/>
        </React.Suspense>
    )
}
```



### 5,Antd引入

#### 5,1 yarn add antd 

#### 5,2 引入antd的样式