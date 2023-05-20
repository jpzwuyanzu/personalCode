import React, { Suspense } from 'react'
import Redirect from './../components/Redirect'
import Loading from './../components/Loading'

const Login: any = React.lazy(() => import('../views/login/Login'));
const PageSandBox = React.lazy(() => import('../layout/page-sand-box/PageSandBox'));
const Home = React.lazy(() => import('../views/home-mannage/Home'));
const RoleList = React.lazy(() => import('../views/merchant/role-mannage/RoleList'));
const UserList = React.lazy(() => import('../views/merchant/user-mannage/UserList'));
const NotFound = React.lazy(() => import('../views/404/NotFound'))


//路由鉴权
const AuthComponent = ({ children }: any) => {
    const isLogin = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token') as any) : '';
    return isLogin ? children : <Redirect to="/login"/>
}
export const  merchant = [
    {
        path: '/login',
        element: <Suspense fallback={ <Loading/> }><Login/></Suspense>
    },
    {
        path: '/merchant',
        element: <Suspense fallback={ <Loading/> }><AuthComponent><PageSandBox/></AuthComponent></Suspense>,
        children: [
            {
                path: '',
                element: <Redirect to="/merchant/home" />
            },
            {
                path: 'home',
                element: <Suspense fallback={ <Loading/> }><AuthComponent><Home/></AuthComponent></Suspense>
            },
            {
                path: 'rolelist'  ,
                element: <Suspense fallback={ <Loading/> }><AuthComponent><RoleList/></AuthComponent></Suspense>  
            },
            {
                path: 'userlist',
                element: <Suspense fallback={ <Loading/> }><AuthComponent><UserList/></AuthComponent></Suspense>
            }
        ]
    },
    {
        path: '/',
        element:<Redirect to="/merchant" />
        // element: pathHost.indexOf('merchant') !== -1 ? <Redirect to="/merchant" /> : <Redirect to="https://www.baidu.com" /> 
    },
    {
        path: '*',
        element: <Suspense fallback={ <Loading/> }><NotFound/></Suspense>
    }
]

