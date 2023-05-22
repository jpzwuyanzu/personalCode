import { useRoutes } from 'react-router-dom'
// import { payment }  from './payment'
// import { merchant } from './merchant'
import React, { Suspense } from 'react'
import Redirect from './../components/Redirect'
import Loading from './../components/Loading'
import { useAppSelector } from './../hooks/hooks'

//公共路由
const Login: any = React.lazy(() => import('@/views/login/Login'));
const PageSandBox = React.lazy(() => import('@/layout/page-sand-box/PageSandBox'));
const Home = React.lazy(() => import('@/views/home-mannage/Home'));

//后管路由
const RoleList = React.lazy(() => import('@/views/payment/role-mannage/RoleList'));
const UserList = React.lazy(() => import('@/views/payment/user-mannage/UserList'));
const LogList = React.lazy(() => import('@/views/payment/log-mannage/LogList'));
const NotFound = React.lazy(() => import('@/views/404/NotFound'))
const ChannelList = React.lazy(() => import('@/views/payment/pay-mannage/ChannelList'))
const PayType = React.lazy(() => import('@/views/payment/pay-mannage/PayType'));
const UpStream = React.lazy(() => import('@/views/payment/pay-mannage/UpStream'))

//商户路由
const MerchantRoleList = React.lazy(() => import('@/views/merchant/role-mannage/RoleList'));
const MerchantUserList = React.lazy(() => import('@/views/merchant/user-mannage/UserList'));



const MRouter = () => {
    // const element = useRoutes(String(import.meta.env.VITE_APP_ROUTE) === 'payment' ? payment : merchant)
    const element = useRoutes(
        [
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
                    },
                    {
                        path: 'channellist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ChannelList/></AuthComponent></Suspense>
                    },
                    {
                        path: 'paytype',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><PayType/></AuthComponent></Suspense>
                    },
                    {
                        path: 'upstream',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><UpStream/></AuthComponent></Suspense>
                    },
                    {
                        path: 'loglist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><LogList/></AuthComponent></Suspense>
                    },
                ]
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
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><MerchantRoleList/></AuthComponent></Suspense>  
                    },
                    {
                        path: 'userlist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><MerchantUserList/></AuthComponent></Suspense>
                    }
                ]
            },
            {
                path: '/',
                element:String(import.meta.env.VITE_APP_ROUTE) === 'payment' ? <Redirect to="/payment" /> : <Redirect to="/merchant" /> 
                // element: pathHost.indexOf('payment') !== -1 ? <Redirect to="/payment" /> : <Redirect to="https://www.baidu.com" /> 
            },
            {
                path: '*',
                element: <Suspense fallback={ <Loading/> }><NotFound/></Suspense>
            }
        ]
    )
    return element
}

//路由鉴权
const AuthComponent = ({ children }: any) => {
    const userToken = useAppSelector((state) => state.user.token)
    return userToken ? children : <Redirect to="/login"/>
}
export default MRouter

