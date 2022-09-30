import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
const Login = React.lazy(() => import('../views/login/Login'))
const NewsSandBox = React.lazy(() => import('../views/newssandbox/NewsSandBox'))
const Home = React.lazy(() => import('../views/home/Home'))
const UserList = React.lazy(() => import('../views/user-mannage/UserList'))
const RightList = React.lazy(() => import('../views/right-mannage/RightList'))
const RoleList = React.lazy(() => import('../views/right-mannage/RoleList'))
const NotFound = React.lazy(() => import('../views/404/NotFound'))
const MRouter = () => {
    const element = useRoutes([
        {
            path: '/login',
            element: <Suspense fallback={ <>....</> }><Login/></Suspense>
        },
        {
            path: '/auth',
            element: <Suspense fallback={ <>....</>}><NewsSandBox/></Suspense>,
            children: [
                {
                    path: '',
                    element: <Redirect to="/auth/home"/>
                },
                {
                    path: 'home',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><Home/></AuthComponent></Suspense>
                },
                {
                    path: 'user-mannage/user-list',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><UserList/></AuthComponent></Suspense>
                },
                {
                    path: 'right-mannage/right-list',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><RightList/></AuthComponent></Suspense>
                },
                {
                    path: 'right-mannage/role-list',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><RoleList/></AuthComponent></Suspense>
                }
            ]
        },
        {
            path: '/',
            element: <Redirect to="/auth"/>
        },
        {
            path: '*',
            element: <Suspense><NotFound/></Suspense>
        }
    ])
    return (element)
}

export default MRouter

//路由鉴权，判断是否登录，如果未登录重定向到登录页面
const AuthComponent = ({ children }: any) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login" />
}
//路由懒加载
const LazyLoad = (path: string) => {
    const Com = React.lazy(() => import(`../views/${path}`));
    return (
        <Suspense fallback={ <>加载中...</> }>
            <Com/>
        </Suspense>
    )
}