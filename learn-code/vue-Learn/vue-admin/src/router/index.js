import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/layout/Login/index.vue')
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/',
    name:'layout',
    component:() => import('../views/layout/index'),
    children:[
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta:{
          title:'系统首页'
        }
      },
      {
        path: 'button',
        name: 'button',
        auth:1,
        meta:{
          title:'按钮管理'
        },
        component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Button/button.vue'),
      },
      {
        path: 'buttonlist',
        name: 'buttonlist',
        meta:{
          title:'按钮列表'
        },
        component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Button/buttonlist.vue')
      },
      {
        path: 'link',
        name: 'link',
        meta:{
          title:'LINK管理'
        },
        component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Link/link.vue'),
      },
      {
        path: 'linklist',
        name: 'linklist',
        meta:{
          title:'链接列表'
        },
        component: () => import(/* webpackChunkName: "buttonlist" */ '../views/Link/linklist.vue')
      }
    ]
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
    NProgress.start()
    let isLogin = sessionStorage.getItem('loginState') ? JSON.parse(sessionStorage.getItem('loginState')) : ''
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

router.afterEach((to,from) => {
  NProgress.done()
})

export default router
