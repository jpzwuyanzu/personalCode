import { createRouter, createWebHistory } from 'vue-router'
import 'nprogress/nprogress'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

/**
 * 路由懒加载
 */
const LayOut = () => import('@/layout/index.vue');
const Home = () => import('@/views/Home.vue');
const DianYing = () => import('@/views/dianying/DianYing.vue');
const DianShiJu = () => import('@/views/dianshiju/DianShiJu.vue');
const Zongyi = () => import('@/views/zongyi/ZongYi.vue');
const DongMan = () => import('@/views/dongman/DongMan.vue');
const LunLi = () => import('@/views/lunli/LunLi.vue');
const Detail = () => import('@/views/detail/Detail.vue');
const Search = () => import('@/views/search/Search.vue');

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
          keepalive: false
        }
      },
      {
        path: 'dianying',
        name: 'dianying',
        component: DianYing,
        meta: {
          keepalive: false
        }
      },
      {
        path: 'dianshiju',
        name: 'dianshiju',
        component: DianShiJu,
        meta: {
          keepalive: false
        }
      },
      {
        path: 'zongyi',
        name: 'zongyi',
        component: Zongyi,
        meta: {
          keepalive: false
        }
      },
      {
        path: 'dongman',
        name: 'dongman',
        component: DongMan,
        meta: {
          keepalive: false
        }
      },
      {
        path: 'lunli',
        name: 'lunli',
        component: LunLi,
        meta: {
          keepalive: false
        }
      },
      {
        path: 'detail/:movieId',
        name: 'detail',
        component: Detail,
        meta: {
          keepalive: false
        }
      },
      {
        path: 'search',
        name: 'search',
        component: Search,
        meta: {
          keepalive: false
        }
      }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
