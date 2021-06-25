import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta:{
      title:'系统首页'
    }
  },
  {
    path: '/button',
    name: 'button',
    meta:{
      title:'按钮管理'
    },
    component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Button/button.vue'),
    children:[
      {
        path: 'buttonlist',
        name: 'buttonlist',
        meta:{
          title:'按钮列表'
        },
        component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Button/buttonlist.vue')
      }
    ]
  },
  {
    path: '/link',
    name: 'link',
    meta:{
      title:'LINK管理'
    },
    component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Link/link.vue'),
    children:[
      {
        path: 'linklist',
        name: 'linklist',
        meta:{
          title:'链接列表'
        },
        component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Link/linklist.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/layout/Login/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 路由拦截
 * 不需要登录能访问的path
 */
const whiteList = ['/login']; 
router.beforeEach((to, from, next) => {
    let isLogin = sessionStorage.getItem('isLogin') ? JSON.parse(sessionStorage.getItem('isLogin')) : ''
    if (whiteList.indexOf(to.path) < 0) { //访问了需要登录才能访问的页面
        if (isLogin) { //登录过来直接进去
            next();
        } else {
            if (to.path == '/login') {
                next();
            } else {
                next('/login');
            }
        }
    } else {
        next();
    }
});

export default router
