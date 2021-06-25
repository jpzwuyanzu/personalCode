import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./../views/home/index.vue'),
    meta: {
      hidden: false
    }
  },
  {
    path: '/kind',
    name: 'kind',
    component: () => import('./../views/kind/index.vue'),
    meta: {
      hidden: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('./../views/cart/index.vue'),
    meta: {
      hidden: false
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./../views/user/index.vue'),
    meta: {
      hidden: false
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('./../views/detail/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '*',
    name: 'notefind',
    component: () => import('./../views/notfind/index.vue'),
    meta: {
      hidden: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
