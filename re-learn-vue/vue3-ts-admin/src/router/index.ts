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
                            redirectPath: '/home',
                            comName: 'home'
                        }
                    ]
                }
            },
            {
                path: 'dash-Mannage/analyze',
                name: 'analyze',
                meta: {
                    auth: true,
                    title: '分析页',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: 'Dashboard',
                            redirectPath: '/dash-Mannage/analyze',
                            comName: 'analyze'
                        },
                        { 
                            name: '分析页',
                            redirectPath: '/dash-Mannage/analyze',
                            comName: 'analyze'
                        }
                    ]
                },
                component: () => import('@/views/dash-Mannage/analyze.vue')
            },
            {
                path: 'dash-Mannage/monitor',
                name: 'monitor',
                meta: {
                    auth: true,
                    title: '监控页',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: 'Dashboard',
                            redirectPath: '/dash-Mannage/monitor',
                            comName: 'analyze'
                        },
                        { 
                            name: '监控页',
                            redirectPath: '/dash-Mannage/monitor',
                            comName: 'monitor'
                        }
                    ]
                },
                component: () => import('@/views/dash-Mannage/monitor.vue')
            },
            {
                path: 'dash-Mannage/workBench',
                name: 'workBench',
                meta: {
                    auth: true,
                    title: '工作台',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: 'Dashboard',
                            redirectPath: '/dash-Mannage/workBench',
                            comName: 'analyze'
                        },
                        { 
                            name: '工作台',
                            redirectPath: '/dash-Mannage/workBench',
                            comName: 'workBench'
                        }
                    ]
                },
                component: () => import('@/views/dash-Mannage/workBench.vue')
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
                            redirectPath: '/order-Mannage/orderList',
                            comName: 'orderMannage'
                        },
                        { 
                            name: '订单列表',
                            redirectPath: '/order-Mannage/orderList',
                            comName: 'orderMannage'
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
                            redirectPath: '/recharge-Mannage/rechargeList',
                            comName: 'rechargeList'
                        },
                        { 
                            name: '充值列表',
                            redirectPath: '/recharge-Mannage/rechargeList',
                            comName: 'rechargeList'
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
                            redirectPath: '/recharge-Mannage/rechargeSetting',
                            comName: 'rechargeList'
                        },
                        { 
                            name: '充值设置',
                            redirectPath: '/recharge-Mannage/rechargeSetting',
                            comName: 'rechargeSetting'
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
                            redirectPath: '/sys-Mannage/sysSetting',
                            comName: 'sysSetting'
                        },
                        { 
                            name: '系统设置',
                            redirectPath: '/sys-Mannage/sysSetting',
                            comName: 'sysSetting'
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
                            redirectPath: '/user-Mannage/userList',
                            comName: 'userList'
                        },
                        { 
                            name: '用户列表',
                            redirectPath: '/user-Mannage/userList',
                            comName: 'userList'
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
                            redirectPath: '/user-Mannage/adminList',
                            comName: 'userList'
                        },
                        { 
                            name: '管理员列表',
                            redirectPath: '/user-Mannage/adminList',
                            comName: 'setting'
                        },
                    ]
                },
                component: () => import('@/views/user-Mannage/admin-List.vue')
            },
            {
                path: 'personal-Mannage/personalCenter',
                name: 'personalCenter',
                meta: {
                    auth: true,
                    title: '个人中心',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '个人页',
                            redirectPath: '/personal-Mannage/personalCenter',
                            comName: 'personalCenter'
                        },
                        { 
                            name: '个人中心',
                            redirectPath: '/personal-Mannage/personalCenter',
                            comName: 'personalCenter'
                        },
                    ]
                },
                component: () => import('@/views/personal-Mannage/personal-Center.vue')
            },
            {
                path: 'personal-Mannage/personalSetting',
                name: 'personalSetting',
                meta: {
                    auth: true,
                    title: '个人设置',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '个人页',
                            redirectPath: '/personal-Mannage/personalSetting',
                            comName: 'personalCenter'
                        },
                        { 
                            name: '个人设置',
                            redirectPath: '/personal-Mannage/personalSetting',
                            comName: 'personalSetting'
                        },
                    ]
                },
                component: () => import('@/views/personal-Mannage/personal-Setting.vue')
            },
            {
                path: 'personal-Mannage/personalSetting/test',
                name: 'personalTest',
                meta: {
                    isChildren: true,
                    auth: true,
                    title: '个人设置',
                    icon: 'el-icon-s-home',
                    breadCrum: true,
                    breadCrum_title: [
                        { 
                            name: '个人页',
                            redirectPath: '/personal-Mannage/personalSetting',
                            comName: 'personalCenter'
                        },
                        { 
                            name: '个人设置',
                            redirectPath: '/personal-Mannage/personalSetting',
                            comName: 'personalSetting'
                        },
                    ]
                },
                component: () => import('@/views/personal-Mannage/test.vue')
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
            next(from.path)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})

export default router