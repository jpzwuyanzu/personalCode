import { lazy } from 'react'

const routes = [{
        path: '/home',
        title: "首页",
        redirect:'/home',
        component: lazy(() => import('../views/indexPage/index')),
    },
    {
        path: '/home/homeDetail',
        title: "首页详情",
        redirect:'/home/homeDetail',
        component: lazy(() => import('../views/indexPage/indexDetail'))
    },
    {
        path: '/play',
        title: "逛逛",
        redirect:'/play',
        component: lazy(() => import('../views/playPage/play')),
    },
    {
        path: '/play/playdetail',
        title: "逛逛详情",
        redirect:'/play/playdetail',
        component: lazy(() => import('../views/playPage/playDetail'))
    },
    {
        path: '/my',
        title: "个人中心",
        redirect:'/my',
        component: lazy(() => import('../views/myPage/personCenter')),
    },
    {
        path: '/my/myDetail',
        title: "个人中心详情",
        redirect:'/my/myDetail',
        component: lazy(() => import('../views/myPage/myDetail'))
    }
]

export default routes