import {
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons-vue'
import Layout from './main.vue'
export default [
  {
    path: '/home',
    name: 'home',
    icon: UserOutlined,
    title: '系统首页',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        component: () => import('./../views/home/index.vue')
      }
    ]
  },
  {
    path: '/banner',
    name: 'banner',
    icon: VideoCameraOutlined,
    title: '轮播图管理',
    component: Layout,
    redirect: '/banner/list',
    children: [
      {
        path: '/banner/list',
        title: '轮播图列表',
        component: () => import('./../views/banner/list.vue')
      },
      {
        path: '/banner/add',
        title: '添加轮播图',
        component: () => import('./../views/banner/add.vue')
      }
    ]
  },
  {
    path: '/pro',
    name: 'pro',
    icon: VideoCameraOutlined,
    title: '产品管理',
    component: Layout,
    redirect: '/pro/list',
    children: [
      {
        path: '/pro/list',
        title: '产品列表',
        component: () => import('./../views/pro/index.vue')
      },
      {
        path: '/pro/add',
        title: '添加产品',
        component: () => import('./../views/pro/add.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    icon: VideoCameraOutlined,
    title: '用户管理',
    component: Layout,
    redirect: '/user/list',
    children: [
      {
        path: '/user/userlist',
        title: '用户列表',
        component: () => import('./../views/user/user.vue')
      },
      {
        path: '/user/adminlist',
        title: '管理员列表',
        component: () => import('./../views/user/admin.vue')
      }
    ]
  }
]
