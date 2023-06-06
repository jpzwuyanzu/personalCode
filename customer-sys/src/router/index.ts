import { createRouter, createWebHashHistory } from 'vue-router'
import { getStorage } from '../utils/common'
import NProgress from 'nprogress'
import 'nprogress/nprogress'

NProgress.configure({ showSpinner: false })

/**
 * 路由懒加载
 */
const LayOut = () => import('../layout/index.vue')
const Login = () => import('../views/Login/index.vue')
const Chat = () => import('../views/Chat/index.vue')
const NotFound = () => import('../views/NotFound/notFound.vue')


const routes: any = [
  {
    path: '/',
    name: 'chat',
    component: LayOut,
    redirect: '/chat',
    children: [
      {
        path: 'chat',
        name: 'chat',
        component: Chat,
        meta: {
          isAuth: true,
          title: '首页',
          keepalive: false,
          breadList: [
            {
              title: 'DashBoard',
              redirectPath: '/chat',
              comName: 'chat'
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
      keepalive: false
    }
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: NotFound,
    meta: {
      isAuth: false,
      title: 'notFound',
      keepalive: false
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/notFound',
    meta: {
      isAuth: false,
      title: 'notFound',
      keepalive: false
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
      if(getStorage('local','token')) {
        next()
      } else {
          next('/login')
      }
    }
  } else {
    if(!getStorage('local','token')) {
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
