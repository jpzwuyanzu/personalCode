import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect';

const MRouter = () => {
    const element = useRoutes([
        
    ])
    return element
}

//路由鉴权，判断是否登录
const AuthComponent = ({ children }: any) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login"/>
}

// 路由懒加载
const LazyLoad = (path: string) => {
    const Comp = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={ <>...加载中</> }>
            <Comp/>
        </React.Suspense>
    )
}

export default MRouter