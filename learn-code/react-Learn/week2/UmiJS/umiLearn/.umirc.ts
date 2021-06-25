import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: '后台管理系统'
  },
  routes: [
    { path: '/', exact: true, redirect: '/home' },
    { path: '/home', name: '系统首页', icon: 'dashboard', component: '@/pages/index' },
    { path: '/login', name: '登录', component: '@/pages/login/index', hideInMenu: true },
    { path: '/banner', name: '轮播图管理', icon: 'AreaChartOutlined',
      routes: [
        { path: '/banner/list', name: '轮播图列表', component: '@/pages/banner/index' },
        { path: '/banner/detail/:id', name: '轮播图详情', component: '@/pages/banner/detail/index',hideInMenu: true },
      ]
    },
    { path: '/product', name: '产品管理', icon: 'DatabaseOutlined',
      routes: [
        { path: '/product/list', name: '产品列表', component: '@/pages/product/index' },
        { path: '/product/add', name: '添加产品', component: '@/pages/product/add/index' },
      ]
    },
    { path: '/user', name: '用户管理', icon: 'UserOutlined',
      routes: [
        { path: '/user/list', name: '用户列表', component: '@/pages/product/index' }
      ]
    }
  ],
  fastRefresh: {},
});
