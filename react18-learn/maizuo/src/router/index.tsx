import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect';
import Loading from '../components/Loading';

const MRouter = () => {
    const element = useRoutes([
        {
          path: '/films',
          element: LazyLoad('films/Film'),
          children: [
              {
                  path: '',
                  element: <Redirect to={'/films/NowPlaying'} />
              },
              {
                  path: 'NowPlaying',
                  element: LazyLoad('films/NowPlaying')
              },
              {
                  path: 'comingSoon',
                  element: LazyLoad('films/ComingSoon')
              }
          ]  
        },
        {
            path: '/film/detail/:filmId',
            element: LazyLoad('films/Detail')
        },
        {
            path: '/cinema',
            element: LazyLoad('cinemas/Cinema')
        },
        {
            path: '/cinema/search',
            element: LazyLoad('cinemas/Search')
        },
        {
            path: '/city',
            element: LazyLoad('cinemas/City')
        },
        {
            path: '/cinema/detail/:filmId',
            element: LazyLoad('cinemas/Detail')
        },
        {
            path: '/news/mz-act',
            element: LazyLoad('news/News')
        },
        {
            path: '/center',
            element: <AuthComponent>{ LazyLoad('center/Center') }</AuthComponent>
        },
        {
            path: '/login',
            element: LazyLoad('login/Login')
        },
        {
            path: '/',
            element: <Redirect to="/films" />
        },
        {
            path: '*',
            element: LazyLoad('NotFound')
        }

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
        <React.Suspense fallback={ <Loading/> }>
            <Comp/>
        </React.Suspense>
    )
}

export default MRouter