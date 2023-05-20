import React, { Suspense } from 'react'
import Redirect from './../components/Redirect'
import Loading from './../components/Loading'
import { useAppSelector } from './../hooks/hooks'

const Login: any = React.lazy(() => import('../views/login/Login'));
const PageSandBox = React.lazy(() => import('../layout/page-sand-box/PageSandBox'));
const Home = React.lazy(() => import('../views/home-mannage/Home'));
const RoleList = React.lazy(() => import('../views/payment/role-mannage/RoleList'));
const UserList = React.lazy(() => import('../views/payment/user-mannage/UserList'));
const NotFound = React.lazy(() => import('../views/404/NotFound'))

//路由鉴权
const AuthComponent = ({ children }: any) => {
    const userToken = useAppSelector((state) => state.user.token)
    return userToken ? children : <Redirect to="/login"/>
}
export const  payment = [
    {
        path: '/login',
        element: <Suspense fallback={ <Loading/> }><Login/></Suspense>
    },
    {
        path: '/payment',
        element: <Suspense fallback={ <Loading/> }><AuthComponent><PageSandBox/></AuthComponent></Suspense>,
        children: [
            {
                path: '',
                element: <Redirect to="/payment/home" />
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
        element:<Redirect to="/payment" />
        // element: pathHost.indexOf('payment') !== -1 ? <Redirect to="/payment" /> : <Redirect to="https://www.baidu.com" /> 
    },
    {
        path: '*',
        element: <Suspense fallback={ <Loading/> }><NotFound/></Suspense>
    }
]

