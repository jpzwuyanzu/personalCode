import { createRouter, createWebHistory } from 'vue-router'

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
            },
            {
                path: 'hotel',
                component: () => import('@/views/hotel/index.vue'),
                name: 'hotel', 
                meta: {
                    auth: false
                } 
              },
              {
                path: 'meishi',
                component: () => import('@/views/meishi/index.vue'),
                name: 'meishi',
                meta: {
                    auth: false
                } 
              },
              {
                path: 'meishi/:dealId',
                component: () => import('@/views/meishi/deal.vue'),
                name: 'deal',
                meta: {
                    auth: false
                }   
              },
              {
                path: 'travel',
                component: () => import('@/views/travel/index.vue'),
                name: 'travel',
                meta: {
                    auth: false
                }  
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
    history: createWebHistory(),
    routes: MRoutes
})

//设置路由拦截器
router.beforeEach((to, from, next) => {
    //在这里做路由拦截
    next()
})

router.afterEach(() => {})


export default router