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


### 3 创建页面并配置路由 .umirc.ts

npx umi g page banner/index --typescript --less
npx umi g page banner/detail/index --typescript --less
npx umi g page product/add/index --typescript --less
npx umi g page product/index --typescript --less
npx umi g page product/detail/index --typescript --less
npx umi g page login/index --typescript --less
npx umi g page user/index --typescript --less

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

### 4， 添加菜单栏图标以及页面标题  .umirc.ts

参考地址： 

* https://umijs.org/zh-CN/docs/directory-structure

* https://pro.ant.design/docs/layout-cn

* https://procomponents.ant.design/

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

```ts
{
  name: 'dashboard',
  icon: 'dashboard',
  hideInMenu: true,
  hideChildrenInMenu: true,
  hideInBreadcrumb: true,
  authority: ['admin'],
}
```
* name: 当前路由在菜单和面包屑中的名称，注意这里是国际化配置的 key，具体展示菜单名可以在 /src/locales/zh-CN.ts 进行配置。
* icon: 当前路由在菜单下的图标名。
* hideInMenu: 当前路由在菜单中不展现，默认 false。
* hideChildrenInMenu: 当前路由的子级在菜单中不展现，默认 false。
* hideInBreadcrumb: 当前路由在面包屑中不展现，默认 false。
* authority: 允许展示的权限，不设则都可见，详见



//////////////
这里是尝试使用可视化umi-ui，不推荐使用
### 5， 接入umi-UI  https://umijs.org/zh-CN/docs/use-umi-ui

```
在项目中运行： yarn add @umijs/preset-ui -D
打开localhost:3000，在项目管理器中选择新建项目，在新建的项目中安装umi-ui， 执行yarn add @umijs/preset-ui -D
然后重新启动新创建的项目，然后可以在localhost：8000 ，
选择右下角的umi图标，可以选择模版或者区块添加到项目中，选择要放置的位置
可以把代码再次移植到其他地方
```

* 对比之后两种创建方式创建的代码有差异，推荐使用脚手架类型的创建项目即 步骤5以上的步骤，不建议采用可视化
/////////////



### 6 ,可以直接引入antd的组件使用

### 7，自定义布局文件的局部
 参考地址： https://umijs.org/zh-CN/plugins/plugin-layout

.umirc.ts

```ts
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
  layout: { // 构建时配置
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

```
//还需要添加运行时配置，使用插件，在src文件夹下新建app.tsx文件
app.tsx或者是App.tsx

具体的配置项可以参考:  https://procomponents.ant.design/components/layout#prolayout

```tsx
import React from 'react';
import { history } from 'umi';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
const RightContent = () => <div>右边</div>
const Footer = () => <div>底边</div>

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings;};
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    menuHeaderRender: () => <div style={{ color: 'white' }}>2323</div>,
    loading: false
  };
};
```
可以配置的属性很多，https://procomponents.ant.design/components/layout#prolayout

### 8, 页面间的跳转

npx umi g page banner/index --typescript --less
npx umi g page banner/detail/index --typescript --less
npx umi g page product/add/index --typescript --less
npx umi g page product/index --typescript --less
npx umi g page product/user/index --typescript --less
npx umi g page product/banner/index --typescript --less
npx umi g page login/index --typescript --less
npx umi g page user/index --typescript --less

路由的定义查看第7步，页面的跳转
在首页面使用了声明式跳转和编程式跳转，参看下边的代码
```tsx
import { history, Link } from 'umi'
export default function IndexPage() {

  const formIsHalfFilledOut = true
  return (
    <div>
      <h1 className={styles.title}>系统的首页</h1>
      <button onClick={ () => {
        history.push('/banner/list')
      } }>去轮播图列表</button>
      <Link to='/user/list'>去用户列表</Link>
    </div>
  );
}
```

如果要定义动态的路由传参数，
定义时
```
{ path: '/banner/detail/:id',  name: '轮播图详情', hideInMenu: true, component: '@/pages/banner/detail/index' }
```
使用时

```tsx
import React, { useEffect } from 'react';
import styles from './index.less';
import { history } from 'umi'

export default function Page() {

  useEffect(() => {
    //在这里请求数据
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Page banner/index</h1>
      <button onClick={ () => {
        history.push('/banner/detail/123')
      } }>去轮播图详情</button>
    </div>
  );
}
```
获取参数时

```tsx
import React from 'react';
import styles from './index.less';
interface Props {

}

export default function Page(props: Props) {

  console.log(props) //在这里的props.match里边可以获取

  return (
    <div>
      <h1 className={styles.title}>轮播图详情</h1>
    </div>
  );
}
```

整体的数据请求的话可以使用axios或者是fetch实现