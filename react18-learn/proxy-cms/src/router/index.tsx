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
const ActUserList = React.lazy(() => import('../views/payment/user-mannage/ActiveUserList'));
const VersionList = React.lazy(() => import('../views/payment/version-mannage/VersionList'));


//--------------代理后台路由，代理支付的路由模块
//代理充值菜单
const ProxyOrder = React.lazy(() => import('../views/payment/proxy-mannage/ProxyOrder'));
const OrderDetail = React.lazy(() => import('../views/payment/proxy-mannage/OrderDetail'));
const OrderStatic = React.lazy(() => import('../views/payment/proxy-mannage/OrderStatic'));
const ProxyReport = React.lazy(() => import('../views/payment/proxy-mannage/ProxyReport'));
const ProxyAnnouncement = React.lazy(() => import('../views/payment/proxy-mannage/ProxyAnnouncement'));
const ChatHistory = React.lazy(() => import('../views/payment/proxy-mannage/ChatHistory'));
//客服会话
const CusSetting = React.lazy(() => import('../views/payment/cus-mannage/CusSetting'));
const CusRoom = React.lazy(() => import('../views/payment/cus-mannage/CusRoom'));
//订单管理
const ProOrderList = React.lazy(() => import('../views/payment/order-mannage/OrderList'));
const ProOrderDetail = React.lazy(() => import('../views/payment/order-mannage/OrderDetail'));
const ProOrderStatic = React.lazy(() => import('../views/payment/order-mannage/OrderStatic'));
//系统设置
const ProPaymentType = React.lazy(() => import('../views/payment/sys-mannage/PaymentType'));
//--------------代理后台路由，代理支付的路由模块

//后管路由


//商户路由
const MerchantRoleList = React.lazy(() => import('@/views/merchant/role-mannage/RoleList'));
const MerchantUserList = React.lazy(() => import('@/views/merchant/user-mannage/UserList'));
//商户路由


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
                        path: 'actuserlist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ActUserList/></AuthComponent></Suspense>
                    },
                    {
                        path: 'versionlist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><VersionList/></AuthComponent></Suspense>
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
                        path: 'proorderlist',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProOrderList/></AuthComponent></Suspense>
                    },
                    {
                        path: 'proorderdetail',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProOrderDetail/></AuthComponent></Suspense>
                    },
                    {
                        path: 'proorderstatic',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProOrderStatic/></AuthComponent></Suspense>
                    },
                    {
                        path: 'propaymenttype',
                        element: <Suspense fallback={ <Loading/> }><AuthComponent><ProPaymentType/></AuthComponent></Suspense>
                    },
                    //代理支付模块
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

