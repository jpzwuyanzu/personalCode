import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Redirect from '../components/Redirect'
// import Film from '../views/Film'
// import Cinema from '../views/Cinema'
// import Search from '../views/Search'
// import Center from '../views/Center'
// import Detail from '../views/Detail'
// import Login from '../views/login'
// import NowPlaying from '../views/films/NowPlaying'
// import ComingSoon from '../views/films/ComingSoon'
// import NotFound from '../views/NotFound'

export default function MRouter() {
    return (
        <Routes>
            {/* <Route path="/" element={ <Film/> } /> */}
            {/* <Route index element={ <Film/> } /> */}
            {/* 这里是嵌套路由 */}
            <Route path="/films" element={ lazyLoad('Film') }>
                {/* 指定默认子组件 */}
                <Route index element={ lazyLoad('films/NowPlaying') } />
                <Route path="nowplaying" element={ lazyLoad('films/NowPlaying') } />
                <Route path="comingsoon" element={ lazyLoad('films/ComingSoon') } />
            </Route>
            <Route path="/cinemas" element={ lazyLoad('Cinema') } />
            <Route path="/cinemas/search" element={ lazyLoad('Search') } />
            <Route path="/login" element={ lazyLoad('login')} />
            <Route path="/center" element={ <AuthComponent>
                {lazyLoad('Center')}
            </AuthComponent> } />

            {/* 动态路由与普通路由 */}
            {/* <Route path="/detail" element={ <Detail/> } /> */}
            <Route path="/detail/:myid" element={ lazyLoad('Detail') } />


            {/* 路由重定向的两个方案 */}
            {/* 方案1: 使用Navigate组件实现重定向功能 */}
            {/* <Route path="*" element={ <Navigate to="films" /> }/> */}
            {/* 方案2: 自定义一个重定向组件 */}
            <Route path="/" element={ <Redirect to="films" /> }/>
            {/* 处理404页面 */}
            <Route path="*" element={ lazyLoad('NotFound') }/>
        </Routes>
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
