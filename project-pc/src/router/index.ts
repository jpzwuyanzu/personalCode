import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress'

const MRoutes = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        children: [
            {
              name: 'home',
              path: 'home',
              component: () => import('@/views/Home/index.vue'),
              
            },
            {
                name: 'bw',
                path: 'bw',
                component: () => import('@/views/Product/bw.vue'),
            },
            {
                name: 'cdn',
                path: 'cdn',
                component: () => import('@/views/Product/cdn.vue'),
            },
            {
                name: 'im',
                path: 'im',
                component: () => import('@/views/Product/im.vue'),
            },
            {
                name: 'kf',
                path: 'kf',
                component: () => import('@/views/Product/kf.vue'),
            },
            {
                name: 'live',
                path: 'live',
                component: () => import('@/views/Product/live.vue'),
            },
            {
                name: 'monitor',
                path: 'monitor',
                component: () => import('@/views/Product/monitor.vue'),
            },
            {
                name: 'sz',
                path: 'sz',
                component: () => import('@/views/Product/sz.vue'),
            },
            {
                name: 'wallet',
                path: 'wallet',
                component: () => import('@/views/Product/wallet.vue'),
            },
            {
                name: 'cooperate',
                path: 'cooperate',
                component: () => import('@/views/Cooperate/index.vue'),
            },
            {
                name: 'hatch',
                path: 'hatch',
                component: () => import('@/views/Hatch/index.vue'),
            },
            {
                name: 'brand',
                path: 'brand',
                component: () => import('@/views/Brand/index.vue'),
            },
            {
                name: 'about',
                path: 'about',
                component: () => import('@/views/About/index.vue'),
            },
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/NotFound/index.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: MRoutes
})


router.beforeEach((_to, _from, next) => {
    NProgress.start()
    next()
  })
  
  router.afterEach(() => {
    NProgress.done()
  })

export default router