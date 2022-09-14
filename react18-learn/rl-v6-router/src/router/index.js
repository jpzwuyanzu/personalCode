import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'

const MRouter = () =>  {
    const element = useRoutes([
        {
            path: '/films',
            element: LazyLoad('Film'),
            children: [
                {
                    path: "",
                    element: <Redirect to="/films/NowPlaying"/>
                },
                {
                    path: "nowPlaying",
                    element: LazyLoad('films/NowPlaying')
                },
                {
                    path: "comingSoon",
                    element: LazyLoad('films/ComingSoon')
                }
            ]
        },
        {
            path: '/cinemas',
            element: LazyLoad('Cinema')
        },
        {
            path: '/cinemas/search',
            element: LazyLoad('Search')
        },
        {
            path: '/login',
            element: LazyLoad('Login')
        },
        {
            path: '/city',
            element: LazyLoad('City')
        },
        {
            path: '/center',
            element: <AuthComponent>{ LazyLoad('Center') }</AuthComponent>
        },
        {
            path: '/detail/:myid',
            element: LazyLoad('Detail')
        },
        {
            path: '/',
            element: <Redirect to="/films"/>
        },
        {
            path: '*',
            element: LazyLoad('NotFound')
        }

    ])
    return (
        element
    )
}


export default MRouter;

//路由鉴权，判断是否登录
function AuthComponent({ children }) {
    const isLogin = localStorage.getItem("token")
    return isLogin ?  children : <Redirect to="/login" />
}


//路由懒加载封装
const LazyLoad = (path) => {
    const Com = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={ <>加载中...</> }>
            <Com/>
        </React.Suspense>
    )
}