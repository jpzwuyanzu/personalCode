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
              name: 'home',
              meta: {
                  auth: false
              }
            }
        ]
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

export default router