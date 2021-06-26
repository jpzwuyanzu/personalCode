import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
   {
       path: '/',
       name: 'home',
       meta: {
           title:'首页',
           keepAlive: true
       },
       component: () => import("../views/Home/index.vue")
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
});

export default router