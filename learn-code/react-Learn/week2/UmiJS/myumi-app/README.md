
### 1, 创建项目

$ mkdir umipro && cd umipro 

$ yarn create @umijs/umi-app 创建

$ cd umipro  &&  yarn  安装依赖

$ yarn start  运行


项目中的文件目录使用命令行创建比较好

### 2, 约定式路由

#### 2.1 配置约定式路由

* 在.umirc.ts中删除routes选项或者注释掉,就会按照约定路由模式 .umirc.ts
```ts
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});

```


/////////////////////////
#### 2.2 ，也可以添加layout选项  .umirc.ts

```ts
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'Ant Design',
    locale: true,
    layout: 'side',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});

```
* 添加一个app.tsx

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
    // menuHeaderRender: () => <div style={{ color: 'white' }}>2323</div>,
    loading: false,
    // menuRender: () => <div>自定义左侧菜单</div>
  };
};
```
* 不建议使用以上这种布局
/////////////////////////////////


#### 2.3 约定式布局

* 删除src/app.tsx  
* 新建src/layouts/index.tsx
```tsx
import React from 'react';

function BasicLayout () {
    return (
        <div>这里就是布局文件</div>
    )
}

export default BasicLayout
```

* 修改.umirc.ts文件

```ts
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {
  //   // 支持任何不需要 dom 的
  //   // https://procomponents.ant.design/components/layout#prolayout
  //   name: 'Ant Design',
  //   locale: true,
  //   layout: 'side',
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});
```

#### 2.4 引入ant-design布局

umi会内置ant-design, 所以无需安装，直接使用

src/layouts/index.tsx

```tsx
import React, { useState } from 'react';
import { Layout,  Menu} from 'antd'
import { 
    UserOutlined, 
    VideoCameraOutlined, 
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

function BasicLayout () {

    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {

        setCollapsed(!collapsed)
    }

    return (
        <Layout className="myLayout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    )
}

export default BasicLayout
```
* 如果需要修改样式，参考文档： https://umijs.org/zh-CN/docs/assets-css

新建 src/global.less

```less
.myLayout {
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  &:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
}

.site-layout {
  .site-layout-background {
    background: #fff;
  }
}

html, body, #root,.ant-layout {
    height: 100%;
}
```
#### 2.5 渲染左侧菜单栏数据

* 新建一个src/routes.ts

```ts
import { 
    HomeOutlined,
    BorderOuterOutlined
 } from '@ant-design/icons'

export default [
    {
        path: '/',
        icon: HomeOutlined,
        name: '系统首页',
    },
    {
        path: '/banner',
        icon: BorderOuterOutlined,
        name: '轮播图管理',
        children: [
            {
                path: '/banner/list',
                name: '轮播图列表'
            },
            {
                path: '/banner/add',
                name: '添加轮播图'
            }
        ]
    }
]
```

* 封装一个src/MyMenu.tsx 

```tsx
import React from 'react'
import { Menu } from 'antd'
import routes from './../routes'

const { SubMenu } = Menu
const renderMenu = (routes: Array<any>) => {
    return routes.map( item => {
        if(item.children) {
          return   <SubMenu key={ item.path } icon={<item.icon />} title={ item.name }>
              {
                  renderMenu(item.children)
              }
          </SubMenu>
        } else {
          return   <Menu.Item icon={ item.icon && <item.icon/> }  key={ item.path }>{ item.name }</Menu.Item>
        }
    } )
}

function MyMenu () {

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
                renderMenu(routes)
            }
          </Menu>
    )
}

export default MyMenu
```

* 在布局中将MyMenu引入进去，加载侧边栏，同时将内容区域修改成props.children

src/layouts/index.tsx

```tsx
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <MyMenu/> //关键部分
    </Sider>
    return (
        <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            { props.children } //关键部分
          </Content>
    )
```

#### 2.6 点击左侧菜单，跳转对应的路由

无需使用withRouter这样的高阶组件

MyMenu.tsx

```tsx
import React from 'react'
import { Menu } from 'antd'
import routes from './../routes'
import { history } from 'umi' //通过这里导入history

const { SubMenu } = Menu
const renderMenu = (routes: Array<any>) => {
    return routes.map( item => {
        if(item.children) {
          return   <SubMenu key={ item.path } icon={<item.icon />} title={ item.name }>
              {
                  renderMenu(item.children)
              }
          </SubMenu>
        } else {
          return   <Menu.Item icon={ item.icon && <item.icon/> }  key={ item.path }>{ item.name }</Menu.Item>
        }
    } )
}

interface ISelect {
    key: string
}

function MyMenu () {

    const selectRoute = ({ key }: ISelect) => {
        history.push(key)
    }

    return (
        <Menu theme="dark" mode="inline" onSelect={ selectRoute } defaultSelectedKeys={['1']} >
            {
                renderMenu(routes)
            }
          </Menu>
    )
}

export default MyMenu
```
#### 2.7 渲染轮播图列表

* 1,安装依赖
 npm install axios @type/axios -S

* 2, 创建文件utils/request.ts

 /src/utils/request.ts

 ```ts
 import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000'
})

export default request
 ```
* 3, 创建api/banner.ts

```ts
import request from '@/utils/request'

export function getBannerlist () {
    return request.get('/banner')
}
```

* 4, 在src/banner/list/index.jsx

```jsx
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getBannerlist } from '@/api/banner'
import { Table, Space, Button } from 'antd'
import { 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons'

interface IBanner {
  alt: string,
  bannerid: string,
  bannerimg: string,
  link: string
}

export default function Page() {
  const [bannerList, setBannetList] = useState([])

  useEffect(() => {
    async function getData () {
      const res = await getBannerlist()
      setBannetList(res.data)
    }
    getData()
  }, [])

  const columns = [
    {
      title: '序号',
      render: (text: string | number | boolean, record: IBanner, index: number) => <span>{ index + 1 }</span>
    },
    {
      title: '图片',
      key: 'bannerimg',
      dataIndex: 'bannerimg',
      render: (text: string, record: IBanner) => {
        return <img src={ text } style={{ width: '100px' }} alt=""/>
      }
    },
    {
      title: '操作',
      render: () =>  <Space>
        <Button type="primary" shape="circle" icon={<EditOutlined />} />
        <Button danger shape="circle" icon={<DeleteOutlined />} />
      </Space>
    }
  ]

  return (
    <Table dataSource={ bannerList } columns={ columns }  rowKey={ item => item.bannerid } />
  );
}

```

#### 2.8 列表进入详情并且传递参数

* 创建文件

npx umi g page banner/detail/index --typescript --less 

* 修改banner/detail/index.tsx 文件名称为banner/detail/[bannerid].tsx

这样umi会自动生成路由
```ts
{
"path": "/banner/detail/:bannerid",
"exact": true,
"component": require('@/pages/banner/detail/[bannerid].tsx').default
},
```
* 如果参数是可选参数，可传可不传

修改banner/detail/index.tsx 文件名称为banner/detail/[bannerid$].tsx


这样umi会自动生成路由
```ts
{
"path": "/banner/detail/:bannerid?",
"exact": true,
"component": require('@/pages/banner/detail/[bannerid].tsx').default
},
```

在banner/list/index.tsx中

```tsx
import { history } from 'umi'



<Button type="primary" onClick = { () => {
  history.push('/banner/detail/' + record.bannerid)
} } shape="circle" icon={<EditOutlined />} />
```

在banner/detail/[bannerid].tsx中获取传递的参数

```tsx
import React from 'react';
import styles from './index.less';


export default function Page({ match: { params: { bannerid } } }: any) {
  
  console.log(bannerid)

  return (
    <div>
      <h1 className={styles.title}>Page banner/detail/index-- { bannerid }</h1>
    </div>
  );
}

```

#### 2.9 如何使用数据共享，（----状态管理器 -----model插件）---第一种，后边还有dva方式

* 使用插件 https://umijs.org/zh-CN/plugins/plugin-model 可以实现函数式组件的数据共享，类组件不可以使用

* 创建src/models/pro.ts ，models文件夹名称必须符合规则
// 定义初始化状态

```ts
import { useState } from 'react';
import { getProlist } from './../api/pro'

export default function () {
    const [prolist, setProlist] = useState([])

    //数据请求
    const getProlistFn = async () => {
        const res = await getProlist()
        setProlist(res.data)
    }

    return {
        prolist,
        getProlistFn
    }
}
```
* 组件中使用状态
pages/pro/list/index.tsx

```tsx
import React, { useEffect } from 'react';
import styles from './index.less';
import { useModel } from 'umi'
import { Table } from 'antd'

export default function Page() {

  // useModel的第一个参数是models下的文件名称
  const { prolist,  getProlistFn} = useModel('pro')

  useEffect(() => {
    getProlistFn()
  }, [])

  const columns = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
    }, 
    {
      title: '产品名称',
      key: "proname",
      dataIndex: 'proname'
    }
  ]

  return (
    <Table dataSource= { prolist } columns= { columns } rowKey = { item => item.id } />
  );
}

```

* 在首页面中使用状态
pages/index.tsx

```tsx
import React, { useEffect } from 'react';
import styles from './index.less';
import { useModel } from 'umi'
import { Table } from 'antd'

export default function IndexPage() {

  //useModel的第二个参数是性能提升，
  // 
  // 第二个参数可以通过返回的对象指定当前组件需要的状态，是提升性能的关键
  const { prolist } = useModel('pro' , (model: any) => {
    console.log(model)
    return {
      prolist: model.prolist
    }
  })

  const columns = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
    }, 
    {
      title: '产品名称',
      key: "proname",
      dataIndex: 'proname'
    },
    {
      title: '价格',
      key: 'originPrice',
      dataIndex: 'originPrice'

    }
  ]

  return (
    <Table dataSource= { prolist } columns= { columns } rowKey = { item => item.id } />
  );
}

```
* model的插件可以让我们在函数式组件中很好的使用状态管理，但是如果是在类组件中，就无法使用model插件来实现状态管理


#### 3.0 学习dva插件-- https://umijs.org/zh-CN/plugins/plugin-dva

创建 src/app.tsx, 这个文件可以加上也可以不加上，主要是为了打印效果

安装模块 
yarn add  redux-logger @types/redux-logger

```tsx
import { createLogger } from 'redux-logger';
import { message } from 'antd';

export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
```

在src/modles/pro.ts

```ts
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getProlist} from './../api/pro'

export interface IPro {
    proname: string
    id: string
}

export interface IProModelState {
    name: string;
    prolist: Array<IPro>
  }

export interface IProModelType {
    namespace: string
    state: IProModelState
    effects: Effect
    reducers: {
        changeProlist: Reducer<IProModelState>
    }
    subscriptions: { setup: Subscription }
}

const proModel: IProModelType = {
    namespace: 'pro', //命名空间，如果不设置，会默认把文件名称作为命名空间
    state: { // 初始化状态
        prolist: [],
        name: ''
    },
    effects: { //类似于vue中的 actions，但是并不是完全一样的
       * getProlistFn({ payload }: any, { call, put  }: any): any {
        // 异步操作，通过call方法调用异步操作，通过put告诉reducer修改状态
        console.log('22222')
        const res = yield call(getProlist)
        console.log('4444444', res)
        yield put({
            type: 'changeProlist',
            payload: res.data
        })
       } 
    },
    reducers: { //类似与vuex中的mutations
        changeProlist(state: IProModelState, action: any) {
            console.log('3333333')
          return {
            ...state,
            prolist: action.payload,
          }
        }
    },
    subscriptions: { //自动会被执行
        setup({ dispatch, history }: any) {
            console.log('11111')
          return history.listen(({ pathname }: any) => {
            if (pathname === '/pro/list') { // 相当于componentDidMount周期
              dispatch({
                type: 'getProlistFn',
              });
            }
          });
        },
    },
}

export default proModel
```

在src/pages/pro/list/index.tsx
```tsx
import React, { useEffect } from 'react';
import { connect } from 'umi'
import { Table } from 'antd'

// const Pro = (props) =>  {
// console.log('pro', props)

//   useEffect(() => {
//     // props.dispatch({
//     //   type: 'setup'
//     // })
//   }, [])
//   const columns = [
//     {
//       title: '序号',
//       render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
//     }, 
//     {
//       title: '产品名称',
//       key: "proname",
//       dataIndex: 'proname'
//     }
//   ]

//   return (
//     <Table dataSource= { props.pro.prolist } columns= { columns } rowKey = { item => item.id } />
//   );
// }

class Pro extends React.Component {
     columns = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
    }, 
    {
      title: '产品名称',
      key: "proname",
      dataIndex: 'proname'
    }
  ]

  render() {
      return (
        <Table dataSource= { this.props.pro.prolist } columns= { this.columns } rowKey = { item => item.id } />
    );
  }
}

export default connect(({ pro }: any) => {
  console.log(pro)
  return {pro}
})(Pro)

```

如果不写subscriptions，可以直接在组件中dispatch
在src/pages/pro/list/index.tsx写法， 注意命名空间

```tsx
componentDidMount() {
    this.props.dispatch({
      type: 'pro/getProlistFn',
    });
  }
```






* umi dva list model 查看当前项目的model模块