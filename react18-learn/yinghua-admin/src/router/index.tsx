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
const PayMentUserList = React.lazy(() => import('@/views/payment/sysuser-mannage/UserList'));
const LogList = React.lazy(() => import('@/views/payment/log-mannage/LogList'));
const NotFound = React.lazy(() => import('@/views/404/NotFound'))
const PayChannelList = React.lazy(() => import('@/views/payment/pay-mannage/ChannelList'))
const PayType = React.lazy(() => import('@/views/payment/pay-mannage/PayType'));
const UpStream = React.lazy(() => import('@/views/payment/pay-mannage/UpStream'))

/**
 * 推广渠道，游戏列表，游戏充值套餐，短信管理，前端用户列表，版本列表
 */
const ChannelList = React.lazy(() => import('../views/payment/channel-mannage/ChannelList'));
const GameList = React.lazy(() => import('../views/payment/game-mannage/GameList'));
const GamePackage = React.lazy(() => import('../views/payment/game-mannage/GamePackage'));
const SmsLIst = React.lazy(() => import('../views/payment/sys-mannage/SmsList'));
const PreUserList = React.lazy(() => import('../views/payment/user-mannage/PreUserList'));
const VersionList = React.lazy(() => import('../views/payment/version-mannage/VersionList'));



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
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><PayMentUserList/></AuthComponent></Suspense>
                    },
                    {
                        path: 'channellist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><PayChannelList/></AuthComponent></Suspense>
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
                    {
                        path: 'channellist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ChannelList/></AuthComponent></Suspense>
                    },
                    {
                        path: 'gamelist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><GameList/></AuthComponent></Suspense>
                    },
                    {
                        path: 'gamepackage',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><GamePackage/></AuthComponent></Suspense>
                    },
                    {
                        path: 'smslist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><SmsLIst/></AuthComponent></Suspense>
                    },
                    {
                        path: 'preuserlist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><PreUserList/></AuthComponent></Suspense>
                    },
                    {
                        path: 'versionlist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><VersionList/></AuthComponent></Suspense>
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

