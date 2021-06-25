import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    // '/api': {
    //   'target': 'http://jsonplaceholder.typicode.com/',
    //   'changeOrigin': true,
    //   'pathRewrite': { '^/api' : '' },
    // }
  },
  styles: [`body { background: gray }`],
  layout: { 
    name: '后台管理系统', 
    showBreadcrumb: true, 
    loading: true, 
    locale: true, 
    theme: 'PRO' 
  },
  routes: [
    { path: '/', exact: true,   redirect: '/home' },
    { path: '/home', name: '系统首页', icon: 'dashboard', component: '@/pages/index' },
    { path: '/login', name: '登录', icon: 'dashboard', hideInMenu: true,  component: '@/pages/login/index' },
    { path: '/banner', icon: 'AreaChartOutlined', name: '轮播图管理', 
    component: '@/layouts/Banner', //规定了轮播图管理的布局文件
     routes: [
       { path: '/banner/list',  name: '轮播图列表', component: '@/pages/banner/index' },
       { path: '/banner/detail/:id',  name: '轮播图详情', hideInMenu: true, component: '@/pages/banner/detail/index' }
     ]
    },
    { path: '/product', name: '产品管理', icon: 'DatabaseOutlined',
     routes: [
       { path: '/product/list', name: '产品列表', component: '@/pages/product/index' },
       { path: '/product/add', name: '添加产品', component: '@/pages/product/add/index' }
     ]
    },
    { path: '/user', name: '用户管理', icon: 'UserOutlined',
     routes: [
       { path: '/user/list', name: '用户列表', component: '@/pages/user/index' }
     ]
    },
  ],
  fastRefresh: {},
});
