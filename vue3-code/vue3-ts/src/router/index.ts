import { createRouter, createWebHashHistory } from 'vue-router'

const MRoutes = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        children: [
            {
              path: 'home',
              component: () => import('@/views/home/index.vue'),
              name: 'home'  
            },
            {
                path: 'hotel',
                component: () => import('@/views/hotel/index.vue'),
                name: 'hotel'  
              },
              {
                path: 'meishi',
                component: () => import('@/views/meishi/index.vue'),
                name: 'meishi'  
              },
              {
                path: 'travel',
                component: () => import('@/views/travel/index.vue'),
                name: 'travel'  
              }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/NotFound.vue')
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

//设置路由拦截器


export default router