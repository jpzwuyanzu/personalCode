### 1,创建react+ts 项目

#### 1.1 create-react-app myapp --template typescript

### 2,安装sass包

#### 2.1  npm i --save sass 

### 3,本地开发配置代理解决跨域问题

#### 3.1  创建src/setupProxy.js

#### 3.2  yarn add http-proxy-middleware

#### 3.3  setupProxy.js
```js
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        })
    );
    };
```

### 4,路由架构

#### 4.1 安装路由 yarn add react-router-dom --save-dev

#### 4.2 封装Redirect组件
src/components/Redirect.tsx
```tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = ({ to }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: true })
    },[])
    return null
}

export default Redirect
```

#### 4.3 src/router/index.tsx

```tsx
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
const MRouter = () => {
    const element = useRoutes([
        {
            path: '/login',
            element: LazyLoad('login/Login.tsx')
        },
        {
            path: '/',
            element: <AuthComponent>{ LazyLoad('newssandbox/NewsSandBox.tsx') }</AuthComponent>,
            children: [
                {
                    path: '',
                    element: <Redirect to="/home"/>
                },
                {
                    path: 'home',
                    element: LazyLoad('home/Home.tsx')
                },
                {
                    path: 'user-mannage/list',
                    element: LazyLoad('user-mannage/UserList.tsx')
                },
                {
                    path: 'right-mannage/right-list',
                    element: LazyLoad('right-mannage/RightList.tsx')
                },
                {
                    path: 'right-mannage/role-list',
                    element: LazyLoad('right-mannage/RoleList.tsx')
                }
            ]
        },
        {
            path: '/',
            element: <Redirect to="/"/>
        },
        {
            path: '*',
            element: LazyLoad('404/NotFound.tsx')
        }
    ])
    return (element)
}

export default MRouter

//路由鉴权，判断是否登录，如果未登录重定向到登录页面
const AuthComponent = ({ children }: any) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login"/>
}

//路由懒加载
const LazyLoad = (path: string) => {
    const Com = React.lazy(() => import(`../views/${path}`));
    return (
        <React.Suspense fallback={ <>加载中...</> }>
            <Com/>
        </React.Suspense>
    )
}
```



### 5,Antd引入

#### 5,1 yarn add antd 

#### 5,2 引入antd的样式

### 6，改造TopHeader组件和SideMenu组件
TopHeader.tsx
```tsx
import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  } from "@ant-design/icons";
const { Header } = Layout;

export default function TopHeader() {

    const [collapsed, setCollapsed] = useState(false);
    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  超级管理员
                </a>
              ),
            },
            {
              key: '2',
              danger: true,
              label: '退出',
            },
          ]}
        />
      );

    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
          {
            collapsed ? <MenuUnfoldOutlined onClick={ changeCollapsed } /> : <MenuFoldOutlined onClick={ changeCollapsed } />
          }
          <div style={{ float: 'right' }}>
              <span>欢迎Admin回来</span>
              <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                <Space>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Space>
                </a>
            </Dropdown>
          </div>
        </Header>
    )
}

```

SideMenu.tsx
```tsx
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    UsergroupAddOutlined,
    OrderedListOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import './SideMenu.scss'

const { Sider } = Layout;
export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const items: any = [
      {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
      },
      {
          label: '用户管理',
          key: '/user-mannage',
          icon: <OrderedListOutlined />,
          children: [
              {
                  label: '用户列表',
                  key: '/user-mannage/list',
              }
          ]
      },
      {
          label: '权限管理',
          key: '/right-mannage',
          icon: <UsergroupAddOutlined />,
          children: [
              {
                  label: '权限列表',
                  key: '/right-mannage/right-list',
              },
              {
                  label: '角色列表',
                  key: '/right-mannage/role-list'
              }
          ]
      }
  ]
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/home"]}
        items={items}
        onClick={ (e) => {
            navigate(e.key)
        } }
      />
    </Sider>
  );
}
```
