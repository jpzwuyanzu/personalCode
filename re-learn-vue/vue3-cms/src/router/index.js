import { createRouter, createWebHashHistory } from 'vue-router'
import { getCookieItem } from './../utils/common'
import NProgress from 'nprogress'
import 'nprogress/nprogress'
const routes = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/home.vue'),
                name: 'home',
                meta: {
                    auth: true,
                    title: '首页',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '系统首页',
                            redirectPath: '/home'
                        }
                    ]
                }
            },
            {
                path: 'order-Mannage/orderList',
                name: 'orderMannage',
                meta: {
                    auth: true,
                    title: '订单列表',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '订单管理',
                            redirectPath: '/order-Mannage/orderList'
                        },
                        { 
                            name: '订单列表',
                            redirectPath: '/order-Mannage/orderList'
                        },
                    ]
                },
                component: () => import('@/views/order-Mannage/order-List.vue')
            },
            {
                path: 'recharge-Mannage/rechargeList',
                name: 'rechargeList',
                meta: {
                    auth: true,
                    title: '充值列表',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '充值管理',
                            redirectPath: '/recharge-Mannage/rechargeList'
                        },
                        { 
                            name: '充值列表',
                            redirectPath: '/recharge-Mannage/rechargeList'
                        },
                    ]
                },
                component: () => import('@/views/recharge-Mannage/recharge-List.vue')
            },
            {
                path: 'recharge-Mannage/rechargeSetting',
                name: 'rechargeSetting',
                meta: {
                    auth: true,
                    title: '充值设置',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '充值管理',
                            redirectPath: '/recharge-Mannage/rechargeSetting'
                        },
                        { 
                            name: '充值设置',
                            redirectPath: '/recharge-Mannage/rechargeSetting'
                        },
                    ]
                },
                component: () => import('@/views/recharge-Mannage/recharge-Setting.vue')
            },
            {
                path: 'sys-Mannage/sysSetting',
                name: 'sysSetting',
                meta: {
                    auth: true,
                    title: '系统设置',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '系统管理',
                            redirectPath: '/sys-Mannage/sysSetting'
                        },
                        { 
                            name: '系统设置',
                            redirectPath: '/sys-Mannage/sysSetting'
                        },
                    ]
                },
                component: () => import('@/views/sys-Mannage/sys-Setting.vue')
            },
            {
                path: 'user-Mannage/userList',
                name: 'userList',
                meta: {
                    auth: true,
                    title: '用户列表',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '用户管理',
                            redirectPath: '/user-Mannage/userList'
                        },
                        { 
                            name: '用户列表',
                            redirectPath: '/user-Mannage/userList'
                        },
                    ]
                },
                component: () => import('@/views/user-Mannage/user-List.vue')
            },
            {
                path: 'user-Mannage/adminList',
                name: 'setting',
                meta: {
                    auth: true,
                    title: '管理员列表',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '用户管理',
                            redirectPath: '/user-Mannage/adminList'
                        },
                        { 
                            name: '管理员列表',
                            redirectPath: '/user-Mannage/adminList'
                        },
                    ]
                },
                component: () => import('@/views/user-Mannage/admin-List.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/layout/login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]
const router  = createRouter({
    history: createWebHashHistory(),
    routes
})

// 全局的路由拦截
router.beforeEach((to, from, next) => {
    if(to.matched.some( m => m.meta && m.meta.auth )) {
        if(to.name === 'login') {
            NProgress.start()
            next()
        } else {
            if(getCookieItem('token')) {
                NProgress.start()
                next()
            } else {
                NProgress.start()
                next('/login')
            }
        }
    } else {
        if(!getCookieItem('token')) {
            NProgress.start()
            next()
        } else {
            next({ name: from.name })
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})

export default router