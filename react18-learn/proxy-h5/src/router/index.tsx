import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect';
import Loading from '../components/Loading';

const MRouter = () => {
    const element = useRoutes([
        {
          path: '/chat',
          element: LazyLoad('chatRoom/Proxy'),
          children: [
              {
                  path: '',
                  element: <Redirect to={'/chat/chat'} />
              },
              {
                  path: 'chat',
                  element: LazyLoad('chatRoom/Chat')
              },
              {
                  path: 'order',
                  element: LazyLoad('chatRoom/Order')
              }
          ]  
        },
        {
            path: '/proxy/allproxy',
            element: LazyLoad('proxy/index')
        },
        {
            path: '/',
            element: <Redirect to="/proxy/allproxy" />
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