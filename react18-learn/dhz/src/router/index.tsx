import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect';
import Loading from '../components/Loading';

const MRouter = () => {
    const element = useRoutes([
        {
            path: '/',
            element: LazyLoad('home/Home')
        },
        {
            path: '/',
            element: <Redirect to="/" />
        },
        {
            path: '*',
            element: LazyLoad('NotFound')
        }

    ])
    return element
}
// 路由懒加载
const LazyLoad = (path: string) => {
    const Comp = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={ <Loading/> }>
            <Comp/>
        </React.Suspense>
    )
}

export default MRouter