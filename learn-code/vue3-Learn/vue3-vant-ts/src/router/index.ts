import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import configRoute from './../layouts/routes'
import notFound from './../views/notFound/index.vue'
const routes: Array<RouteRecordRaw> = [
   {
       path: '/',
       redirect: '/home/index'
   },
   {
       path: '/login',
       name: 'login',
       meta: {
           title: '登录',
           keepAlive: true
       },
       component: () => import('../views/Login/index.vue')
   }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

configRoute.forEach(item => {
    router.addRoute(item)
})

router.addRoute({
    path: '/:pathMatch(.*)*',
    component: notFound
  })

export default router