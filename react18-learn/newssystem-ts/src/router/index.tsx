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
            path: '/auth',
            element: LazyLoad('newssandbox/NewsSandBox.tsx'),
            children: [
                {
                    path: '',
                    element: <Redirect to="/auth/home"/>
                },
                {
                    path: 'home',
                    element: <AuthComponent>{ LazyLoad('home/Home.tsx') }</AuthComponent>
                },
                {
                    path: 'user-mannage/user-list',
                    element: <AuthComponent>{ LazyLoad('user-mannage/UserList.tsx') }</AuthComponent>
                },
                {
                    path: 'right-mannage/right-list',
                    element: <AuthComponent>{ LazyLoad('right-mannage/RightList.tsx') }</AuthComponent>
                },
                {
                    path: 'right-mannage/role-list',
                    element: <AuthComponent>{ LazyLoad('right-mannage/RoleList.tsx') }</AuthComponent>
                }
            ]
        },
        {
            path: '/',
            element: <Redirect to="/auth"/>
        },
        {
            path: '*',
            element: LazyLoad('../views/404/NotFound.tsx')
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