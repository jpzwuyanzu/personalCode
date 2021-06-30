import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import notFound from './../views/notFound/notFound'
import myroutes from './../layout/menu'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

myroutes.forEach(item => {
  router.addRoute(item)
})

router.addRoute({
  path: '/:pathMatch(.*)*',
  component: notFound
})

console.log(router.getRoutes()) //  获取当前路由中所有的路由
console.log(router)

export default router
