import { createRouter, createWebHashHistory } from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false })

/**
 * 路由懒加载
 */

const Home = () => import('@/views/Home/index.vue');

const NotFound = () => import('@/views/NotFound/index.vue');


const routes: any = [
    {
        path: '/home',
        component: Home,
    },
    {
        path:'/',
        redirect: '/home'
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: {
            title: 'notFound',
            keepalive: false,
            breadCrum: false
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/notFound',
        meta: {
            title: 'notFound',
            keepalive: false,
            breadCrum: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    Nprogress.start()
    next()
})
router.afterEach(() => {
    Nprogress.done()
})
export default router