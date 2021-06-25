import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/index.vue'
import { getItem } from './../utils/common'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      hidden: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      hidden: false,
      auth: true
    }
  },
  {
    path: '/kind',
    name: 'kind',
    component: () => import(/* webpackChunkName: "kind" */ '../views/kind/index.vue'),
    meta: {
      hidden: false,
      auth: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue'),
    meta: {
      hidden: false,
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/home/detail',
    name: 'homeDetail',
    component: () => import(/* webpackChunkName: "homeDetail" */ '../views/home/detail.vue'),
    meta: {
      hidden: true,
      auth: true
    }
  },
  {
    path: '/kind/detail',
    name: 'kindDetail',
    component: () => import(/* webpackChunkName: "kindDetail" */ '../views/kind/detail.vue'),
    meta: {
      hidden: true,
      auth: true
    }
  },
  {
    path: '*',
    name: 'notfind',
    component: () => import(/* webpackChunkName: "notfind" */ '../views/notfind/index.vue'),
    meta: {
      hidden: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({x: 0,  y: 0 }),
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.auth) {
    if (getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
