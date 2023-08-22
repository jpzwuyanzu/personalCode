import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress'

NProgress.configure({ showSpinner: false })

/**
 * 路由懒加载
 */
const LayOut = () => import('@/layout/layout.vue')
const Home = () => import('@/views/index.vue');

const routes = [
    {
        path: '/',
        name: 'home',
        component: LayOut,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                meta: {
                    title: '首页'
                }
            }
        ]

    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  /**
 * 全局路由拦截
 */
// router.beforeEach((to, from, next) => {
//     NProgress.start()
//   })
  
//   router.afterEach(() => {
//     NProgress.done()
//   })
  
  export default router
