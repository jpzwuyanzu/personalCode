import { useRoutes } from 'react-router-dom'
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
const PayMentUserList = React.lazy(() => import('@/views/payment/sysuser-mannage/UserList')); //成员列表
const ProxyUserList = React.lazy(() => import('@/views/payment/proxyuser-mannage/UserList')); //代理列表
const NotFound = React.lazy(() => import('@/views/404/NotFound'))


//--------------代理后台路由，代理支付的路由模块
//代理充值菜单
const ProxyOrder = React.lazy(() => import('../views/payment/proxy-mannage/ProxyOrder'));
const OrderDetail = React.lazy(() => import('../views/payment/proxy-mannage/OrderDetail'));
const OrderStatic = React.lazy(() => import('../views/payment/proxy-mannage/OrderStatic'));
const ProxyReport = React.lazy(() => import('../views/payment/proxy-mannage/ProxyReport'));
const ProxyAnnouncement = React.lazy(() => import('../views/payment/proxy-mannage/ProxyAnnouncement'));
const ChatHistory = React.lazy(() => import('../views/payment/proxy-mannage/ChatHistory'));
const ProPaymentType = React.lazy(() => import('../views/payment/sys-mannage/PaymentType'));
//客服会话
const CusSetting = React.lazy(() => import('../views/payment/cus-mannage/CusSetting'));
const CusRoom = React.lazy(() => import('../views/payment/cus-mannage/CusRoom'));
//--------------代理后台路由，代理支付的路由模块



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
                        path: 'proxyuserlist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProxyUserList/></AuthComponent></Suspense>
                    },
                    //代理支付模块
                    {
                        path: 'proxyorder',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProxyOrder/></AuthComponent></Suspense>
                    },
                    {
                        path: 'orderdetail',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><OrderDetail/></AuthComponent></Suspense>
                    },
                    {
                        path: 'orderstatic',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><OrderStatic/></AuthComponent></Suspense>
                    },
                    {
                        path: 'proxyreport',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProxyReport/></AuthComponent></Suspense>
                    },
                    {
                        path: 'proxyannouncement',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProxyAnnouncement/></AuthComponent></Suspense>
                    },
                    {
                        path: 'chathistory',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ChatHistory/></AuthComponent></Suspense>
                    },
                    {
                        path: 'cussetting',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><CusSetting/></AuthComponent></Suspense>
                    },
                    {
                        path: 'cusroom',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><CusRoom/></AuthComponent></Suspense>
                    },
                    {
                        path: 'propaymenttype',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProPaymentType/></AuthComponent></Suspense>
                    },
                    //代理支付模块
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
    )
    return element
}

//路由鉴权
const AuthComponent = ({ children }: any) => {
    const userToken = useAppSelector((state) => state.user.userInfo.tokenInfo)
    return userToken ? children : <Redirect to="/login"/>
}
export default MRouter

