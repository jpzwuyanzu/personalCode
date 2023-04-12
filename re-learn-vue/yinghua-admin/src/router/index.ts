import { createRouter, createWebHashHistory } from 'vue-router'
/**
 * 路由懒加载
 */
const LayOut = () => import('@/layout/index.vue')
const Login = () => import('@/layout/Login.vue')
const NotFound = () => import('@/views/NotFound.vue')
const Home = () => import('@/views/home.vue')
const UserList = () => import('@/views/user-mannage/userList.vue')
const RoleList = () => import('@/views/role-mannage/roleList.vue')
const OrderList = () => import('@/views/order-mannage/orderList.vue')


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
          title: '首页'
        }
      },
      {
        path: 'order-mannage/orderList',
        name: 'orderList',
        component: OrderList,
        meta: {
          isAuth: true,
          title: '订单订单列表'
        }
      },
      {
        path: 'role-mannage/RoleList',
        name: 'RoleList',
        component: RoleList,
        meta: {
          isAuth: true,
          title: '角色列表'
        }
      },
      {
        path: 'user-mannage/UserList',
        name: 'UserList',
        componnet: UserList,
        meta: {
          isAuth: true,
          title: '用户列表'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/notFound'
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
//   next()
// })

export default router
