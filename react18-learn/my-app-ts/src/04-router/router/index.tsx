import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../../components/Redirect'
const MRouter = () => {
    const element = useRoutes([
        {
            path: '/films',
            element: Lazyload('Film'),
            children: [
                {
                    path: '',
                    element: <Redirect to="/films/NowPlaying" />
                },
                {
                    path: 'nowPlaying',
                    element: Lazyload('films/NowPlaying')
                },
                {
                    path: 'comingSoon',
                    element: Lazyload('films/ComingSoon')
                }
            ]
        },
        {
            path: '/cinemas',
            element: Lazyload('Cinemas')
        },
        {
         path: '/center',
         element: Lazyload('Center')   
        },
        {
          path: '/detail/:myId',
          element: Lazyload('Detail')
        },
        {
            path: '/',
            element: <Redirect to="/films"/>
        },
    ])
    return (element)
}

export default MRouter

//路由懒加载
const Lazyload = (path: string) => {
    const Com = React.lazy(() => import(`../views/${path}`));
    return (
        <React.Suspense fallback={ <>加载中...</> }>
            <Com/>
        </React.Suspense>
    )
}