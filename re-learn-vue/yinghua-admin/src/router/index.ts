import { createRouter, createWebHashHistory } from 'vue-router'
import { getStorage } from '@/utils/common'
import NProgress from 'nprogress'
import 'nprogress/nprogress'

NProgress.configure({ showSpinner: false })

/**
 * 路由懒加载
 */
const LayOut = () => import('@/layout/index.vue')
const Login = () => import('@/layout/login.vue')
const NotFound = () => import('@/views/NotFound.vue')
const Home = () => import('@/views/home.vue')
const UserList = () => import('@/views/user-mannage/userList.vue')
const RoleList = () => import('@/views/role-mannage/roleList.vue')
const PermissList = () => import('@/views/role-mannage/permissList.vue')
const OrderList = () => import('@/views/order-mannage/orderList.vue')
const OrderStastic = () => import('@/views/order-mannage/oredrStastic.vue')
const UserStastic = () => import('@/views/user-mannage/userStastic.vue')


const routes: any = [
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
          isAuth: true,
          title: '首页',
          keepalive: false,
          breadCrum: true,
          breadList: [
            {
              title: 'DashBoard',
              redirectPath: '/home',
              comName: 'home'
            }
          ]
        }
      },
      {
        path: 'order-mannage/orderList',
        name: 'orderList',
        component: OrderList,
        meta: {
          isAuth: true,
          title: '订单列表',
          keepalive: true,
          breadCrum: true,
          breadList: [
            {
              title: '订单管理',
              redirectPath: '/order-mannage/orderList',
              comName: 'orderList'
            },
            {
              title: '订单列表',
              redirectPath: '/order-mannage/orderList',
              comName: 'orderList'
            }
          ]
        }
      },
      {
        path: 'order-mannage/orderStastic',
        name: 'orderStastic',
        component: OrderStastic,
        meta: {
          isAuth: true,
          title: '订单统计',
          keepalive: true,
          breadCrum: true,
          breadList: [
            {
              title: '订单管理',
              redirectPath: '/order-mannage/orderList',
              comName: 'orderList'
            },
            {
              title: '订单统计',
              redirectPath: '/order-mannage/orderStastic',
              comName: 'orderStastic'
            }
          ]
        }
      },
      {
        path: 'role-mannage/roleList',
        name: 'roleList',
        component: RoleList,
        meta: {
          isAuth: true,
          title: '角色列表',
          keepalive: false,
          breadCrum: true,
          breadList: [
            {
              title: '角色管理',
              redirectPath: '/role-mannage/roleList',
              comName: 'roleList'
            },
            {
              title: '角色列表',
              redirectPath: '/role-mannage/roleList',
              comName: 'roleList'
            }
          ]
        }
      },
      {
        path: 'role-mannage/permissList',
        name: 'permissList',
        component: PermissList,
        meta: {
          isAuth: true,
          title: '权限列表',
          keepalive: false,
          breadCrum: true,
          breadList: [
            {
              title: '角色管理',
              redirectPath: '/role-mannage/roleList',
              comName: 'roleList'
            },
            {
              title: '权限列表',
              redirectPath: '/role-mannage/permissList',
              comName: 'permissList'
            }
          ]
        }
      },
      {
        path: 'user-mannage/userList',
        name: 'userList',
        component: UserList,
        meta: {
          isAuth: true,
          title: '用户列表',
          keepalive: true,
          breadCrum: true,
          breadList: [
            {
              title: '用户管理',
              redirectPath: '/user-mannage/userList',
              comName: 'userList'
            },
            {
              title: '用户列表',
              redirectPath: '/user-mannage/userList',
              comName: 'userList'
            }
          ]
        }
      },
      {
        path: 'user-mannage/userStastic',
        name: 'userStastic',
        component: UserStastic,
        meta: {
          isAuth: true,
          title: '用户统计',
          keepalive: true,
          breadCrum: true,
          breadList: [
            {
              title: '用户管理',
              redirectPath: '/user-mannage/userList',
              comName: 'userList'
            },
            {
              title: '用户统计',
              redirectPath: '/user-mannage/userStastic',
              comName: 'userStastic'
            }
          ]
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isAuth: false,
      title: '登录',
      keepalive: false,
      breadCrum: false
    }
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: NotFound,
    meta: {
      isAuth: false,
      title: 'notFound',
      keepalive: false,
      breadCrum: false
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/notFound',
    meta: {
      isAuth: false,
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

/**
 * 全局路由拦截
 */
router.beforeEach((to, from, next) => {
  // next()
  NProgress.start()
  if(to.matched.some( m => m.meta && m.meta.isAuth )) {
    if(to.name === 'login') {
      next()
    } else {
      if(getStorage('local','yinhua-admin-soore')) {
        next()
      } else {
          next('/login')
      }
    }
  } else {
    if(!getStorage('local','yinhua-admin-soore')) {
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
