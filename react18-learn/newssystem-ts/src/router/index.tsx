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