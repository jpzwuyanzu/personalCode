
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
import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
const Login = React.lazy(() => import('../views/login/Login'))
const NewsSandBox = React.lazy(() => import('../views/newssandbox/NewsSandBox'))
const Home = React.lazy(() => import('../views/home/Home'))
const UserList = React.lazy(() => import('../views/user-mannage/UserList'))
const RightList = React.lazy(() => import('../views/right-mannage/RightList'))
const RoleList = React.lazy(() => import('../views/right-mannage/RoleList'))
const NotFound = React.lazy(() => import('../views/404/NotFound'))
const MRouter = () => {
    const element = useRoutes([
        {
            path: '/login',
            element: <Suspense fallback={ <>....</> }><Login/></Suspense>
        },
        {
            path: '/auth',
            element: <Suspense fallback={ <>....</>}><NewsSandBox/></Suspense>,
            children: [
                {
                    path: '',
                    element: <Redirect to="/auth/home"/>
                },
                {
                    path: 'home',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><Home/></AuthComponent></Suspense>
                },
                {
                    path: 'user-mannage/user-list',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><UserList/></AuthComponent></Suspense>
                },
                {
                    path: 'right-mannage/right-list',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><RightList/></AuthComponent></Suspense>
                },
                {
                    path: 'right-mannage/role-list',
                    element: <Suspense fallback={ <>....</>}><AuthComponent><RoleList/></AuthComponent></Suspense>
                }
            ]
        },
        {
            path: '/',
            element: <Redirect to="/auth"/>
        },
        {
            path: '*',
            element: <Suspense><NotFound/></Suspense>
        }
    ])
    return (element)
}

export default MRouter

//路由鉴权，判断是否登录，如果未登录重定向到登录页面
const AuthComponent = ({ children }: any) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login" />
}
//路由懒加载
const LazyLoad = (path: string) => {
    const Com = React.lazy(() => import(`../views/${path}`));
    return (
        <Suspense fallback={ <>加载中...</> }>
            <Com/>
        </Suspense>
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
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    MessageOutlined,
    CheckSquareOutlined,
    CloudUploadOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation } from 'react-router-dom'
import './SideMenu.scss'
import axios from 'axios';
const { Sider } = Layout;
const IconList: any = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <UsergroupAddOutlined />,
    '/news-manage': <MessageOutlined />,
    '/audit-manage': <CheckSquareOutlined />,
    '/publish-manage': <CloudUploadOutlined />
}

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const openKeys = ['/' + pathname.split('/')[1]]
  const filterMenu = (menuArr: any) => {
     menuArr.map((item: any, index: any) => {
            item.icon = IconList[item.key]
     })
     return menuArr
  } 
  useEffect(() => {
    axios.get('http://localhost:3000/menu').then(res => {
        let tempArr: any = filterMenu(res.data)
        setMenuList(tempArr)
    })
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <div className="logo">全球新闻发布系统</div>
        <div style={{ flex: 1, overflow: 'hidden'}}>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={[pathname]}
                selectedKeys={[pathname]}
                defaultOpenKeys={openKeys}
                items={menuList}
                onClick={ (e) => {
                    navigate(e.key)
                }}
            />
        </div>
      </div>
    </Sider>
  );
}
```

### 7,JSON Server 
 
 npm install -g json-server
 ```tsx
 // post 新增
 axios.post('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
// 查询
axios.get('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
//整个替换
axios.put('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
// 更新部分
axios.patch('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
// 删除
axios.delte('http://localhost:3000/posts/1')

//_embed 多表关联查询，向下关联
axios.get('http://localhost:3000/posts?_embed=comments',{
    title: 'test',
    author: 'tony'
})

//_expand 多表关联查询，向上关联
axios.get('http://localhost:3000/comments?_expand=posts',{
    title: 'test',
    author: 'tony'
})

 ```

### 8, 添加nprogress 

npm install --save nprogress @types/nprogress

封装Loading.tsx组件
```tsx
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


export default function Loding() {
    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])
    return (<div></div>)
}
``` 
在Suspense 的fallback中使用





### 9,构建登录页面

```jsx
```

### 10, 路由权限
