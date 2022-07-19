import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
export default function MRouter() {
    const element = useRoutes([
        {
            path: "/films",
            element: lazyLoad("Film"),
            children:[
                {
                    path: "",
                    element: <Redirect to="/films/NowPlaying"/>
                },
                {
                    path: "nowplaying",
                    element: lazyLoad("films/NowPlaying")
                },
                {
                    path: "comingsoon",
                    element: lazyLoad("films/ComingSoon")
                },
            ]
        },
        {
            path: "/cinemas",
            element: lazyLoad("Cinema")
        },
        {
            path: "/cinemas/search",
            element: lazyLoad("Search")
        },
        {
            path:"/login",
            element: lazyLoad('login')
        },
        {
            path: "/center",
            element: <AuthComponent>{ lazyLoad("Center") }</AuthComponent>
        },
        {
            path: "/detail/:myid",
            element: lazyLoad('Detail')
        },
        {
            path: "/",
            element: <Redirect to="films"/>
        },
        {
            path: "*",
            element: lazyLoad('NotFound')
        }
    ])
    return (
        element
    )
}

//路由拦截组件的封装
const AuthComponent = ({ children }) => {

    const isLogin = localStorage.getItem('token')

    return isLogin ?  children : <Redirect to="/login"/>
}

// 路由懒加载封装
const lazyLoad = (path) => {
    const Comp = React.lazy(() => import(`../views/${path}`))
    return(
        <React.Suspense fallback={ <>加载中....</> }>
            <Comp/>
        </React.Suspense>
    )
}
