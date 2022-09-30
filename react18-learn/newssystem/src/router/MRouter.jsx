import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
// import Login from '../views/login/Login'
// import Main from '../views/layout/Main'
// import Home from '../views/home/Home'
// import UserList from '../views/user-mannage/UserList'

const MRouter = () => {
    const element = useRoutes([
        {
            path: '/login',
            element: LazyLoad('login/Login')
        },
        {
            path: '/',
            element: LazyLoad('layout/Main'),
            children: [
                {
                    path: '',
                    element: <Redirect to="/home" />
                },
                {
                    path: 'home',
                    element: LazyLoad('home/Home')
                },
                {
                    path: 'user-mannage/user/list',
                    element: LazyLoad('user-mannage/UserList')
                }
            ]
        },
        {
            path: '/',
            element: <Redirect to="/" />
        }
    ])
    return (element)
}

export default MRouter

//路由鉴权，判断是否登录，如果未登录重定向到登录页面
const AuthComponent = ({ children }) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login"/>
}

//路由懒加载
const LazyLoad = (path) => {
    const Com = React.lazy(() => import(`../views/${path}`));
    return (
        <React.Suspense fallback={ <>加载中...</> }>
            <Com/>
        </React.Suspense>
    )
}
