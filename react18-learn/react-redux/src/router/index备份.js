import React from 'react'
import { Routes,  Route } from 'react-router-dom'
import Redirect from '../components/Redirect'
// import Film from './../views/Film'
// import Cinema from './../views/Cinema'
// import Center from './../views/Center'
// import NotFound from './../views/NotFound'
// import Search from './../views/Search'
// import NowPlaying from './../views/films/NowPlaying'
// import ComingSoon from './../views/films/ComingSoon'
// import Detail from './../views/Detail'
// import Login from './../views/Login'

const MRouter = () =>  {
    return (
        <Routes>
            {/* 这里可以添加/路由 */}
            {/* <Route path="/" element={ <Film/> } /> */}
            {/* 也可以设置index来指定/渲染的组件 */}
            {/* <Route index element={ <Film/> } /> */}

            {/* 嵌套路由 */}
            <Route path="/films" element={ LazyLoad('Film') }>
                <Route index element={ LazyLoad('films/NowPlaying') } />
                <Route path="nowPlaying" element={ LazyLoad('films/NowPlaying') } />
                <Route path="comingSoon" element={ LazyLoad('films/ComingSoon') } />
            </Route>
            <Route path="/cinemas" element={ LazyLoad('Cinema') } />
            <Route path="/center" element={<AuthComponent>
                { LazyLoad('Center') }
            </AuthComponent>} />
            <Route path="/login" element={ LazyLoad('Login') } />
            {/* 动态路由 /detal/:id */}
            <Route path="/detail/:myid" element={ LazyLoad('Detail') } />
            <Route path="/cinemas/search" element={ LazyLoad('Search') } />

            {/* 重定向方式1，使用Navigate组件 */}
            {/* <Route path="*" element={ <Navigate to="/films"/> } /> */}

            {/* 重定向方式2，自定义一个Redirect组件 */}
            <Route path="/" element={ <Redirect to="/films"/> } />

            {/* 404 */}
            <Route path="*" element={ LazyLoad('NotFound') } />
        </Routes>
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