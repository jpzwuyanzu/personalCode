<!-- # 创建目录
$ mkdir myapp && cd myapp

# 安装依赖
$ yarn add umi

# 创建页面
$ npx umi g page index --typescript --less 这里生成指定的页面

# 启动开发
$ npx umi dev -->




### 1, 创建项目

$ mkdir umipro && cd umipro 

$ yarn create @umijs/umi-app 创建

$ cd umipro  &&  yarn  安装依赖

$ yarn start  运行

### 2,配置布局 

* 默认的脚手架内置了 @umijs/preset-react，包含布局、权限、国际化、dva、简易数据流等常用功能。
* 比如想要 ant-design-pro 的布局，编辑 .umirc.ts 配置 layout: {}，并且需要安装 @ant-design/pro-layout。

```ts
import { defineConfig } from 'umi';

export default defineConfig({
+ layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
```
* 不用重启 yarn start，webpack 会在背后增量编译，过一会就可以看到以下界面，

#### 2.1 打包 yarn build  会生成一个dist文件

#### 2.2 本地验证

    $ yarn global add serve
    $ serve ./dist

验证通过就可以发布dist目录


### 3 创建页面并配置路由

npx umi g page product/add/index --typescript --less
npx umi g page product/index --typescript --less
npx umi g page product/user/index --typescript --less
npx umi g page product/banner/index --typescript --less

在.umirc.ts 中配置路由

```ts
routes: [
    { path: '/', exact: true, redirect: '/home' },
    { path: '/home', name: '系统首页',  component: '@/pages/index' },
    { path: '/banner', name: '轮播图管理', 
     routes: [
       { path: '/banner/list', name: '轮播图列表', component: '@/pages/banner/index' }
     ]
    },
    { path: '/product', name: '产品管理', 
     routes: [
       { path: '/product/list', name: '产品列表', component: '@/pages/product/index' },
       { path: '/product/add', name: '添加产品', component: '@/pages/product/add/index' }
     ]
    },
    { path: '/user', name: '用户管理', 
     routes: [
       { path: '/user/list', name: '用户列表', component: '@/pages/user/index' }
     ]
    },
  ],
```

### 4， 添加菜单栏图标以及页面标题

参考地址： https://pro.ant.design/docs/layout-cn
```ts
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: { name: '后台管理系统' },
  routes: [
    { path: '/', exact: true,   redirect: '/home' },
    { path: '/home', name: '系统首页', icon: 'dashboard',  component: '@/pages/index' },
    { path: '/banner', icon: 'AreaChartOutlined', name: '轮播图管理', 
     routes: [
       { path: '/banner/list',  name: '轮播图列表', component: '@/pages/banner/index' }
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

```



## 掘金文章： https://juejin.cn/post/6947599812447436830