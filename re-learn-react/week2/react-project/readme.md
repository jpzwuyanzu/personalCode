# 一，React后台管理系统

## 1，创建项目
```js
npx create-react-app react-admin
```
## 2，配置装饰器(不是必须)
  
  1- 安装模块
  ```js
  yarn add customize-cra react-app-rewired  @babel/plugin-proposal-decorators
  ```
 2- 修改命令
   ```json
    "scripts": {
        "start": "react-app-rewired start", //更新
        "build": "react-app-rewired build", //更新
        "test": "react-app-rewired test", //更新
        "eject": "react-scripts eject" //不变
    },
 ```
  3- 在项目根目录下创建 config-overrides.js

 ```js
 const {override, addDecoratorsLegacy} = require("customize-cra")
 module.exports = override(
     addDecoratorsLegacy(), //配置装饰器模式
 )
 ```
## 3, 配置UI库
 https://ant.design/docs/react/introduce-cn 查看文档

 https://ant.design/docs/react/use-with-create-react-app-cn  查看具体使用文档

 ```
 yarn add antd -S/ cnpm install antd -S


 ```
 删除src文件内容, 

 index.js
 ```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
 ```

 测试ui库 App.jsx

```jsx
import React from 'react';
import { Button } from 'antd'

const App = () => {
    return (
        <div>
            hello
            <Button type="primary">button</Button>
        </div>
    );
}

export default App;

```

## 4，修改目录结构
 ```
 src/
   api/
   store/
   layout/
   components/
   router/
   views/
   router/

 ```
## 5, 搭建项目主结构

查看layout布局组件，修改App.jsx
```jsx
import React from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import logo from './logo.svg'

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
              <img src={logo} style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }} alt=""/>
              { this.state.collapsed ? null :  <span>JD_ADMIN</span>}
          </div>
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
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
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
    );
  }
}


export default App
```
添加logo

相关样式index.css

```css
@import '~antd/dist/antd.css';

html,body, #root,.ant-layout {
    height: 100%;
}
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff;
    height: 64px;
}

#components-layout-demo-custom-trigger .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }
  
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
```

将App.jsx代码移植搭配index.jsx
```jsx
import React from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import logo from './logo.svg'

const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
              <img src={logo} style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }} alt=""/>
              { this.state.collapsed ? null :  <span>JD_ADMIN</span>}
          </div>
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
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
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
    );
  }
}


export default Index
```

安装 yarn add  react-router-dom@5 -S

修改App.jsx, 注意logo的路径

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './layout/main/index'

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" component={ Main }></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;

```

## 6, 设计左侧菜单栏
 1.系统首页
 2.轮播图管理
  2-1.轮播图列表
 3.快捷导航管理
  3-1.导航分类
  3-2.导航列表
  3-3.首页导航
 4.秒杀管理
  4-1.首页秒杀列表
 5.广告管理

生成左侧菜单基本配置信息 router/menus.js
```js
import {
    HomeOutlined,
    PictureOutlined,
    MenuOutlined,
    LinkOutlined
  } from '@ant-design/icons';

const menus = [
    {
        path: '/',
        title: '系统首页',
        icon: <HomeOutlined/>
    },
    {
        path: '/bannermanager',
        title: '轮播图管理',
        icon: <PictureOutlined />,
        children: [
            {
                path: '/bannermanager/list',
                title: '轮播图列表',
                icon: <MenuOutlined />
            }, 
        ]
    },
    {
        path: '/navigatormanager',
        title: '快捷导航管理',
        icon: <LinkOutlined />,
        children: [
            {
                path: '/navigatormanager/list',
                title: '导航列表',
                icon: <MenuOutlined />
            }, 
            {
                path: '/navigatormanager/category',
                title: '导航分类',
                icon: <MenuOutlined />
            }, 
            {
                path: '/navigatormanager/homelist',
                title: '首页导航',
                icon: <MenuOutlined />
            }, 
        ]
    },
    {
        path: '/seckillmanager',
        title: '秒杀管理',
        icon: <PictureOutlined />,
        children: [
            {
                path: '/seckillmanager/list',
                title: '首页秒杀列表',
                icon: <MenuOutlined />
            }, 
        ]
    },
    {
        path: '/admanager',
        title: '广告管理',
        icon: <PictureOutlined />
    },
]

export default menus
```
## 7 左侧菜单
配置左侧菜单栏(抽离左侧菜单栏组件/layout/main/SideMenu.jsx)
```jsx
import React, { Component } from "react";
import { Menu } from "antd";
import menus from "./../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识

class SideMenu extends Component {
  renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {this.renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return (
              <Menu.Item key={item.path} icon={item.icon}>
                {item.title}
              </Menu.Item>
            );
          }
        })}
      </>
    );
  };

  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {/* // 方便做多级菜单，用到递归的设计思想 */}
        {this.renderMenu(menus)}
      </Menu>
    );
  }
}

export default SideMenu;

```

## 8创建相应页面
在views中创建页面对应的组件


## 9 配置路由

使用路由的懒加载，lazy， Suspense

/layout/main.Index.jsx

```jsx
import React, { Suspense, lazy } from 'react'
<Content
  className="site-layout-background"
  style={{
    margin: '24px 16px',
    padding: 24,
    minHeight: 280,
    position: 'relative' //一定要设置氟元素的相对定位，再给子元素的loading加上定位
  }}
>
  <Suspense fallback={<div className="loading"><Spin size="large" /> </div>}>
  <Switch>
    <Route path="/" exact component = { lazy(() => import('../../views/home/Index')) }></Route>
  </Switch>
  </Suspense>
</Content>
```
index.css
```css
/* 页面加载loading样式 */
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
```

结合路由的router-config， 修改router文件夹下的menus.js
```js
import React, { lazy } from 'react'
import {
    HomeOutlined,
    PictureOutlined,
    MenuOutlined,
    LinkOutlined,
    OrderedListOutlined,
    PicRightOutlined,
    DashOutlined,
    FieldTimeOutlined,
    UnorderedListOutlined,
    UserOutlined
  } from '@ant-design/icons';

const menus = [
    {
        path: '/',
        title: '系统首页',
        icon: <HomeOutlined/>,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        path: '/bannermanager',
        title: '轮播图管理',
        icon: <PictureOutlined />,
        children: [
            {
                path: '/bannermanager/list',
                title: '轮播图列表',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/banner/Index'))
            }, 
        ]
    },
    {
        path: '/navigatormanager',
        title: '快捷导航管理',
        icon: <LinkOutlined />,
        children: [
            {
                path: '/navigatormanager/list',
                title: '导航列表',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/navgator/List'))
            }, 
            {
                path: '/navigatormanager/category',
                title: '导航分类',
                icon: <PicRightOutlined />,
                component: lazy(() => import('./../views/navgator/Category'))
            }, 
            {
                path: '/navigatormanager/homelist',
                title: '首页导航',
                icon: <DashOutlined />,
                component: lazy(() => import('./../views/navgator/HomeList'))
            }, 
        ]
    },
    {
        path: '/seckillmanager',
        title: '秒杀管理',
        icon: <FieldTimeOutlined />,
        children: [
            {
                path: '/seckillmanager/list',
                title: '首页秒杀列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/seckill/List'))
            }, 
        ]
    },
    {
        path: '/usermanager',
        title: '用户管理',
        icon: <UserOutlined />,
        children: [
            {
                path: '/usermanager/list',
                title: '用户列表',
                icon: <UserOutlined />,
                component: lazy(() => import('./../views/user/List'))
            }, 
        ]
    }
    // {
    //     path: '/admanager',
    //     title: '广告管理',
    //     icon: <GooglePlusOutlined />
    // },
]

export default menus
```

渲染路由 /layout/main/Index.jsx
  ```jsx
 import React, { Suspense, lazy } from 'react'
import { Layout, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom'
import logo from './../../logo.svg'
import SideMenu from './SideMenu'
import menus from './../../router/menu'

const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  renderRoute = (menus) => {
    return menus.map(item => {
      if(item.children) {
        return this.renderRoute(item.children)
      } else {
        return(
          <Route key={item.path} path={item.path}
          exact
          component = { item.component }></Route>
        )
      }
    })
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
              <img src={logo} style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }} alt=""/>
              { this.state.collapsed ? null :  <span>JD_ADMIN</span>}
          </div>
          <SideMenu/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              position: 'relative'
            }}
          >
            <Suspense fallback={<div className="loading"><Spin size="large" /> </div>}>
            <Switch>
            {
              this.renderRoute(menus)
            }
              {/* <Route path="/" exact component = { lazy(() => import('../../views/home/Index')) }></Route> */}
            </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default Index
  ```

添加一个用户管理以及用户列表页面

添加路由测试
```js
{
    path: '/usermanager',
    title: '用户管理',
    icon: <UserOutlined />,
    children: [
        {
            path: '/usermanager/list',
            title: '用户列表',
            icon: <UserOutlined />,
            component: lazy(() => import('./../views/user/List'))
        }, 
    ]
}
```

进一步优化项目，设置一个路由组件，参考vue的RouterView

router/RouterView.jsx
```jsx
import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route } from "react-router-dom";
import menus from "./menu";

const RouterView = () => {
  const renderRoute = (menus) => {
    return menus.map((item) => {
      if (item.children) {
        return renderRoute(item.children);
      } else {
        return (
          <Route
            key={item.path}
            path={item.path}
            exact
            component={item.component}
          ></Route>
        );
      }
    });
  };
  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spin size="large" />
        </div>
      }
    >
      <Switch>{renderRoute(menus)}</Switch>
    </Suspense>
  );
};

export default RouterView;

```
在layout/main/Index.jsx中使用RouterView
```jsx
<Content
  className="site-layout-background"
  style={{
    margin: '24px 16px',
    padding: 24,
    minHeight: 280,
    position: 'relative'
  }}
>
  {/* 自定义的路由组件，类比vue中RouterView */}
  <RouterView/>
</Content>
```

+ 疑问： 如果有的页面不需要在左侧菜单栏出现，如何处理？


先配置路由选项menu.js

```js
{
        path: '/setting',
        title: '用户设置',
        icon: <UserOutlined />,
        component: lazy(() => import('../views/setting/Index')),
        meta: { // 该路由不出现在左侧菜单栏
            hidden: true
        }
    }
```

SideMenu.jsx

```jsx
import React from "react";
import { Menu } from "antd";
import menus from "./../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识

const SideMenu = () => {
  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            // 在这里判断要不要在侧边栏出现路由
            return item.meta && item.meta.hidden ? 
            null
             :
            <Menu.Item key={item.path} icon={item.icon}>
            {item.title}
            </Menu.Item>
          }
        })}
      </>
    );
  }

    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {/* // 方便做多级菜单，用到递归的设计思想 */}
        {renderMenu(menus)}
      </Menu>
    );
}

export default SideMenu;

```

## 10 点击菜单栏跳转页面
SideMenu.jsx

```jsx
import React from "react";
import { withRouter } from 'react-router-dom' 
import { Menu } from "antd";
import menus from "./../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识

const SideMenu = withRouter((props) => { //通过withRouter包裹为了获取编程式导航的对象

  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return item.meta && item.meta.hidden ? 
            null
             :
            <Menu.Item key={item.path} icon={item.icon}>
            {item.title}
            </Menu.Item>
          }
        })}
      </>
    );
  }


  const goPage = ({ key }) => {
    props.history.push(key) 
  }
    return (
      <Menu theme="dark" 
      mode="inline" 
      defaultSelectedKeys={["1"]}
      onClick = { goPage } //跳转页面
      >
          {/* // 方便做多级菜单，用到递归的设计思想 */}
        {renderMenu(menus)}
      </Menu>
    );
})

export default SideMenu;

```

+ 疑问： 点击轮播图列表，刷新之后，左侧菜单选中状态消失

```jsx
import React from "react";
import { withRouter, useHistory, useLocation} from 'react-router-dom'
import { Menu } from "antd";
import menus from "./../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识

const SideMenu = withRouter((props) => { //通过withRouter包裹为了获取编程式导航的对象

  const history  = useHistory()
  

  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return item.meta && item.meta.hidden ? 
            null
             :
            <Menu.Item key={item.path} icon={item.icon}>
            {item.title}
            </Menu.Item>
          }
        })}
      </>
    );
  }


  const goPage = ({ key }) => {
    history.push(key)
  }

  // 为了显示当前左侧菜单栏选中的状态 - string[ key ]  key值就是path
  // defaultSelectedKeys
  // defaultOpenKeys
  const { pathname } = useLocation() 
  const type = '/' + pathname.split('/')[1] 

    return (
      <Menu theme="dark" 
      mode="inline" 
      defaultSelectedKeys={[pathname]} // 数组
      defaultOpenKeys={[type]} //数组
      onClick = { goPage }
      >
        {/* // 方便做多级菜单，用到递归的设计思想 */}
        {renderMenu(menus)}
      </Menu>
    );
})

export default SideMenu;

```

## 11 设计头部

抽离头部header， 

main/Index.jsx
```jsx
import React from 'react'
import { Layout } from 'antd';
import logo from './../../logo.svg'
import SideMenu from './SideMenu'
import RouterView from './../../router/RouterView'
import MainHeader from './MainHeader'

const { Sider, Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
              <img src={logo} style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }} alt=""/>
              { this.state.collapsed ? null :  <span>JD_ADMIN</span>}
          </div>
          <SideMenu/>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header> */}
          <MainHeader/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              position: 'relative'
            }}
          >
            {/* 自定义的路由组件，类比vue中RouterView */}
           <RouterView/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default Index
```

创建/main/MainHeader.jsx

```jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout

const MainHeader = () => {
    
    const [collapsed, setCollapsed] = useState(false)
    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',  }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            {
               collapsed ?  
               <MenuUnfoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
                : 
               <MenuFoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
            }
          </Header>
    );
}

export default MainHeader;

```

此时点击小图标，左侧菜单不会打开关闭
引入状态管理器

```
cnpm istall redux react-redux redux-thunk -D
或者
yarn add  redux react-redux redux-thunk -D

如果需要使用持久化数据结构
cnpm install immutable redux-immutable -D
或者
yarn add immutable redux-immutable -D
```
### 1.创建分reducer  store/modules/common.js

```js
import { Map } from 'immutable'
import * as types from './../actionTypes'

const reducer = (state = Map({
    collapsed: false
}), action) => {
    switch (action.type) {
        case types.CHANGE_COLLAPSED:
            return state.set('collapsed', !state.get('collapsed'))
        default:
            return state
    }
}

export default reducer
```

### 2. 创建actiontypes.js
```js
const CHANGE_COLLAPSED = 'CHANGE_COLLAPSED' //左侧菜单收缩变量
export {
    CHANGE_COLLAPSED
}
```
### 3.创建状态管理器 store/index.js
```js
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk'

import commonReducer from './modules/common'

const reducer = combineReducers({
    common: commonReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default  store

```

### 4.入口文件引入状态管理器 src/index.js
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index'

ReactDOM.render(
    <Provider store = { store } >
        <App/>
    </Provider>,
    document.getElementById('root')
)
```
### 5. layout/main/MainHeader.jsx中使用状态管理器
```jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import * as types from './../../store/actionTypes'
import { connect } from 'react-redux'
const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed }) => {
    
    // const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        changeCollapsed()
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',  }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            {
               collapsed ?  
               <MenuUnfoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
                : 
               <MenuFoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
            }
          </Header>
    );
}

export default connect( state => ({
        collapsed: state.getIn(['common', 'collapsed']) //immutable 中获取模块数据
    }), dispatch => ({
        changeCollapsed() {
            dispatch({
                type: types.CHANGE_COLLAPSED
            })
        }
    }) )(MainHeader);
```

### 6. layout/main/Index.jsx
```jsx
import React from 'react'
import { Layout } from 'antd';
import logo from './../../logo.svg'
import SideMenu from './SideMenu'
import RouterView from './../../router/RouterView'
import MainHeader from './MainHeader'
import { connect } from 'react-redux'

const { Sider, Content } = Layout;

// state => { return { collapsed: state.common.collapsed } }
// ({ common }) => ({ collapsed: common.collapsed })
// ({ common: { collapsed } }) => ({ collapsed: collapsed })
// ({ common: { collapsed } }) => ({ collapsed })

@connect(state => { //用到装饰器语法，如果咩有配置，可以使用原来的方式调用
  return {
    collapsed: state.getIn(['common', 'collapsed'])
  }
})
class Index extends React.Component {
  

  render() {
    const { collapsed } = this.props

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
              <img src={logo} style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }} alt=""/>
              { collapsed ? null :  <span>JD_ADMIN</span>}
          </div>
          <SideMenu/>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header> */}
          <MainHeader/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              position: 'relative'
            }}
          >
            {/* 自定义的路由组件，类比vue中RouterView */}
           <RouterView/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default Index
```

## 12 左侧菜单选中的时候只展开一个菜单项

SideMenu.jsx
```jsx
import React, { useState } from "react";
import { withRouter, useHistory, useLocation} from 'react-router-dom'
import { Menu } from "antd";
import menus from "./../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识

const rootSubmenuKeys = []
menus.map(item => (
  item.children ? rootSubmenuKeys.push(item.path) : null
))


const SideMenu = withRouter((props) => { //通过withRouter包裹为了获取编程式导航的对象

  const [openKeys, setOpenKeys] = useState([])
  // const [ rootSubmenuKeys, setRootSubmenuKeys ] = useState([])

  const history  = useHistory()
  

  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return item.meta && item.meta.hidden ? 
            null
             :
            <Menu.Item key={item.path} icon={item.icon}>
            {item.title}
            </Menu.Item>
          }
        })}
      </>
    );
  }


  const goPage = ({ key }) => {
    history.push(key)
  }

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 为了显示当前左侧菜单栏选中的状态 - string[ key ]  key值就是path
  // defaultSelectedKeys
  // defaultOpenKeys
  const { pathname } = useLocation() 
  const type = '/' + pathname.split('/')[1] 

    return (
      <Menu theme="dark" 
      mode="inline" 
      defaultSelectedKeys={[pathname]} // 数组
      defaultOpenKeys={[type]} //数组
      openKeys={ openKeys }
      onOpenChange={ onOpenChange }
      onClick = { goPage }
      >
        {/* // 方便做多级菜单，用到递归的设计思想 */}
        {renderMenu(menus)}
      </Menu>
    );
})

export default SideMenu;
```

## 13面包屑导航组件 layout/main/Breadcrumb.jsx
```jsx
import menus from './../../router/menu'
import { withRouter, useLocation, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const breadcrumbNameMap = {}

const renderbreadcrumbNameMap = (menus) => {
    menus.forEach((item, index) => {
        if(item.children) {
            breadcrumbNameMap[item.path] = item.title
            renderbreadcrumbNameMap(item.children)
        } else {
            breadcrumbNameMap[item.path] = item.title
        }
    })
}

renderbreadcrumbNameMap(menus)

const Breadcrum = withRouter((props) => {
    // console.log(useLocation(), props.location)
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter(i => i);
    // console.log(pathSnippets) //['bannermanager', 'list']
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        return (
            <Breadcrumb.Item key={url} style={{ lineHeight: '64px'}}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        )
    })

    const breadcrumbItems = [
        <Breadcrumb.Item key="home" style={{ lineHeight: '64px'}}>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>,
      ].concat(extraBreadcrumbItems);


    return (
        <>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </>
    )
})

export default Breadcrum
```

使用面包屑导航，在MainHeader.jsx组件
```jsx
import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import * as types from './../../store/actionTypes'
import { connect } from 'react-redux'
import Breadcrumb from './Breadcrumb'

const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed }) => {

    const toggle = () => {
        changeCollapsed()
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',display: 'flex'  }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            <div style={{ width: '50px' }}>
            {
               collapsed ?  
               <MenuUnfoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={ toggle } />
                : 
               <MenuFoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={ toggle } />
            }
            </div>
            <div style={{ flex: 1}}>
              <Breadcrumb/>
            </div>
          </Header>
    );
}

export default connect( state => ({
        collapsed: state.getIn(['common', 'collapsed'])
    }), dispatch => ({
        changeCollapsed() {
            dispatch({
                type: types.CHANGE_COLLAPSED
            })
        }
    }) )(MainHeader);

```
修改路由配置menu.js
```js
import React, { lazy } from 'react'
import {
    HomeOutlined,
    PictureOutlined,
    MenuOutlined,
    LinkOutlined,
    OrderedListOutlined,
    PicRightOutlined,
    DashOutlined,
    FieldTimeOutlined,
    UnorderedListOutlined,
    UserOutlined
  } from '@ant-design/icons';

const menus = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            hidden: true
        }
    },
    {
        path: '/home',
        title: '系统首页',
        icon: <HomeOutlined/>,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        path: '/bannermanager',
        title: '轮播图管理',
        icon: <PictureOutlined />,
        redirect: '/bannermanager/list',
        children: [
            {
                path: '/bannermanager/list',
                title: '轮播图列表',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/banner/Index'))
            }, 
        ]
    },
    {
        path: '/navigatormanager',
        title: '快捷导航管理',
        icon: <LinkOutlined />,
        redirect: '/navigatormanager/list',
        children: [
            {
                path: '/navigatormanager/list',
                title: '导航列表',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/navgator/List'))
            }, 
            {
                path: '/navigatormanager/category',
                title: '导航分类',
                icon: <PicRightOutlined />,
                component: lazy(() => import('./../views/navgator/Category'))
            }, 
            {
                path: '/navigatormanager/homelist',
                title: '首页导航',
                icon: <DashOutlined />,
                component: lazy(() => import('./../views/navgator/HomeList'))
            }, 
        ]
    },
    {
        path: '/seckillmanager',
        title: '秒杀管理',
        icon: <FieldTimeOutlined />,
        redirect: '/seckillmanager/list',
        children: [
            {
                path: '/seckillmanager/list',
                title: '首页秒杀列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/seckill/List'))
            }, 
        ]
    },
    {
        path: '/usermanager',
        title: '用户管理',
        icon: <UserOutlined />,
        redirect: '/usermanager/list',
        children: [
            {
                path: '/usermanager/list',
                title: '用户列表',
                icon: <UserOutlined />,
                component: lazy(() => import('./../views/user/List'))
            }
        ]
    },
    {
        path: '/setting',
        title: '用户设置',
        icon: <UserOutlined />,
        component: lazy(() => import('../views/setting/Index')),
        meta: {
            hidden: true
        }
    }
]

export default menus
```
## 14 封装RedirectRouterView.jsx组件
创建router/RedirectRouterView.jsx组件
```jsx
import React from 'react';
import { Redirect, Switch  } from 'react-router-dom'
import menus from './menu'

// 把含有redirect重定向属性的过滤出来
const redirectMenus = menus.filter(item => item.redirect)

const RedirectRouterView = () => {
    return (
        <Switch>
            {
                redirectMenus.map(item => <Redirect key={ item.path } path={ item.path } exact to={ item.redirect } />)
            }
        </Switch>
    );
}

export default RedirectRouterView;

```

在router/RouterView.jsx中使用上面定义的组件, 同时把新增的 path='/'的Route过滤掉
```jsx
import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route } from "react-router-dom";
import menus from "./menu";
import  RedirectRouterView from './RedirectRouterView'

const RouterView = () => {
  const renderRoute = (menus) => {
    return menus.map((item) => {
      if (item.children) {
        return renderRoute(item.children);
      } else {
        return item.path === '/' ? null : (<Route
            key={item.path}
            path={item.path}
            exact
            component={item.component}
          ></Route>)
      }
    });
  };
  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spin size="large" />
        </div>
      }
    >
      <Switch>{renderRoute(menus)}</Switch>
      <RedirectRouterView/>
    </Suspense>
  );
};

export default RouterView;

```

修改SideMenu.jsx组件，当页面刷新的时候也要保持左侧菜单的选中状态
```jsx
import React, { useState, useEffect } from "react";
import { withRouter, useHistory, useLocation} from 'react-router-dom'
import { Menu } from "antd";
import menus from "./../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识
const rootSubmenuKeys = []
menus.forEach(item => (
  item.children && rootSubmenuKeys.push(item.path)
))


const SideMenu = withRouter((props) => { //通过withRouter包裹为了获取编程式导航的对象
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const history  = useHistory()
  

  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return item.meta && item.meta.hidden ?  null
             :
            (
              <Menu.Item key={item.path} icon={item.icon}>
              {item.title}
              </Menu.Item>
            )
          }
        })}
      </>
    );
  }


  const goPage = ({ key }) => {
    history.push(key)
  }

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 为了显示当前左侧菜单栏选中的状态 - string[ key ]  key值就是path
  // defaultSelectedKeys
  // defaultOpenKeys
  const { pathname } = useLocation() 
  const type = '/' + pathname.split('/')[1] 

  useEffect(() => {
    setOpenKeys([type])
    setSelectedKeys([pathname])
  }, [type ,pathname])

    return (
      <Menu theme="dark" 
      mode="inline" 
      defaultSelectedKeys={[pathname]} // 数组
      defaultOpenKeys={[type]} //数组
      openKeys={ openKeys }
      selectedKeys={selectedKeys}
      onOpenChange={ onOpenChange }
      onClick = { goPage }
      >
        {/* // 方便做多级菜单，用到递归的设计思想 */}
        {renderMenu(menus)}
      </Menu>
    );
})

export default SideMenu;

```

## 15 轮播图管理页面
 ### 1.前端页面构建 banner/Index.jsx
 ```jsx
 import React, { Fragment } from 'react';
import { Button, Table, Space } from 'antd'

const dataSource = [
    
  ];
  
  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ index + 1 }</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
    },
    {
      title: '链接地址',
      align: 'center',
      dataIndex: 'link',
      key: 'link',
    },
    {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>  
                <Space>
                    <span style={{ color: '#00a' }}>编辑</span>
                    <span>|</span>
                    <span style={{ color: '#f00' }}>删除</span>
                </Space>
                </>
            )
        }
      },
  ];

const BannerList = () => {
    return (
        <Fragment>
            <Button type="primary">新增轮播图</Button>
            <Table dataSource={dataSource} columns={columns} />
        </Fragment>
    );
}

export default BannerList;

 ```
 ### 2.添加轮播图的页面

  /views/banner/Add.jsx

  ```jsx
import React from 'react';

const AddBanner = () => {
    return (
        <div>
            添加轮播图
        </div>
    );
}

export default AddBanner;
```

配置路由，添加Add的路由，并且设置不显示在左侧菜单项

点击新增轮播图按钮，切换到添加页面

```jsx
const BannerList = (props) => {

    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            <Table dataSource={dataSource} columns={columns} />
        </Fragment>
    );
}
```
### 3. 添加页面的布局
Add.jsx
```jsx
import React, { useState } from "react";
import { Form, Button, Upload, Input, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const AddBanner = () => {
  const [url, setUrl] = useState("");

  const onFinish = (values) => {
    // console.log("Received values of form: ", values.bannerimg[0].thumbUrl);
    values.bannerimg = values.bannerimg[0].thumbUrl
    console.log(values)
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    setUrl(e.fileList[0].thumbUrl);
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        "input-number": 3,
        "checkbox-group": ["A", "B"],
        rate: 3.5,
      }}
    >
      <Form.Item
        {...formItemLayout}
        name="link"
        label="跳转页面地址"
        rules={[
          {
            required: true,
            message: "请输入跳转地址",
          },
        ]}
      >
        <Input placeholder="请输入跳转地址" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="alt"
        label="alt"
        rules={[
          {
            required: true,
            message: "请输入提示语句",
          },
        ]}
      >
        <Input placeholder="请输入提示语句" />
      </Form.Item>
      <Form.Item
        name="bannerimg"
        label="上传图片"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[
            {
              required: true,
              message: "请选择轮播图片",
            },
          ]}
      >
        <Upload name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
          <Image width={200} src={url} />
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBanner;

```
### 4. 调用轮播图接口

必须先封装axios

### 5. 封装axios

```
yarn add axios 
```

utils/request.js
```js
import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev ? 'http://39.99.182.33/api' : 'http://www.test.com/api'

})

//设置拦截器

export default request
```
在api/下创建banner.js，处理轮播图相关的接口,如果出现跨域的情况，需要在package.json中配置proxy字段,解决跨域问题

```json
"proxy": "http://example.com/api/"
```
api/banner.js
```js
import request from './../utils/request'


export function addBanner (params) {
    return request.post('/banner/add', params)
}

export function loadBannerList () {
    return request.get('/pro/category')
}
```
在组件中使用即可

### 6，渲染轮播图列表

 添加成功之后返回轮播图列表页面
```jsx
props.history.goBack()
```

在api/banner.js中封装请求
```js
import request from './../utils/request'


export function addBanner (params) {
    return request.post('/banner/add', params)
}

export function loadBannerList (params) {
    return request.get('/banner', { params })
}
```

在views/banner/Index.jsx中请求数据
```jsx
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space, Image } from 'antd'
// import { loadBannerList } from './../../api/banner'
  
  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ index + 1 }</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => {
        return (
          <Image src={ record.bannerimg  } style={{ width: '60xp', height: '60px' }} />
        )
      }
    },
    {
      title: '链接地址',
      align: 'center',
      dataIndex: 'link',
      key: 'link',
    },
    {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>  
                <Space>
                    <span style={{ color: '#00a' }}>编辑</span>
                    <span>|</span>
                    <span style={{ color: '#f00' }}>删除</span>
                </Space>
                </>
            )
        }
      },
  ];

const BannerList = (props) => {

  const [ bannerList, setBannerList ] = useState([])

  useEffect(() => {
    fetch('/lunbo.json').then(res => res.json()).then(result => {
      console.log(result)
      setBannerList(result.data)
    })
  }, [])

    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            <Table dataSource={bannerList}  columns={columns} />
        </Fragment>
    );
}

export default BannerList;

```

### 7，删除数据 banner/Index.jsx

```jsx
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space, Image, Popconfirm } from 'antd'
// import { loadBannerList } from './../../api/banner'
  

  const deleteItem = (bannberid) => () =>  {
    console.log(bannberid)
    // 在这里删除单条数据
  }

  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ index + 1 }</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => {
        return (
          <Image src={ text } width="60px" height="60px" />
        )
      }
    },
    {
      title: '链接地址',
      align: 'center',
      dataIndex: 'link',
      key: 'link',
    },
    {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>  
                <Space>
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={ deleteItem(record.bannerid) }
                  okText="确定"
                  cancelText="取消"
                >
                  <span style={{ color: '#f00', cursor: 'pointer' }}>删除</span>
                </Popconfirm>
                </Space>
                </>
            )
        }
      },
  ];

const BannerList = (props) => {

  const [ bannerList, setBannerList ] = useState([])

  useEffect(() => {
    fetch('/lunbo.json').then(res => res.json()).then(result => {
      console.log(result)
      setBannerList(result.data)
    })
  }, [])

    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            <Table rowKey={ (record) => record.bannerid }  dataSource={bannerList}  columns={columns} />
        </Fragment>
    );
}

export default BannerList;

```
组件的自动分页还存在问题


### 8,配置表格的分页信息
banner/Index.jsx
```jsx
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space, Image, Popconfirm } from 'antd'
// import { loadBannerList } from './../../api/banner'
  

 
const BannerList = (props) => {

  const [ bannerList, setBannerList ] = useState([])
  //设置分页
  const [pageSize, setPageSize] = useState(5)
  const [ total, setTotal ] = useState(0)
  const [ current, setCurrent ] = useState(1)

  useEffect(() => {
    fetch('/lunbo.json').then(res => res.json()).then(result => {
      console.log(result)
      setBannerList(result.data)
    })
  }, [])

  const deleteItem = (bannberid) => () =>  {
    console.log(bannberid)
    // 在这里删除单条数据,并重新拉取数据
  }

  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ index + 1 }</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => {
        return (
          <Image src={ text } width="60px" height="60px" />
        )
      }
    },
    {
      title: '链接地址',
      align: 'center',
      dataIndex: 'link',
      key: 'link',
    },
    {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>  
                <Space>
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={ deleteItem(record.bannerid) }
                  okText="确定"
                  cancelText="取消"
                >
                  <span style={{ color: '#f00', cursor: 'pointer' }}>删除</span>
                </Popconfirm>
                </Space>
                </>
            )
        }
      },
  ];

  


    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            <Table 
            rowKey={ (record) => record.bannerid }
            dataSource={bannerList}  
            columns={columns}
            bordered={ true } //边框属性
            pagination={ {
              position: ['bottomLeft'],
              showSizeChanger: true,
              pageSizeOptions: [10 ,15, 20,50],
              showQuickJumper: true,
              pageSize: pageSize,
              // hideOnSinglePage: true //慎用，不可逆
              showTotal: (total, range) => {
                console.log(total, range)
                return `共有${ total }条数据`
              },
              total: total,
              current: current,
              onChange: (page, pageSize) => {
                setCurrent(page)
              },
              onShowSizeChange: (current, size) => {
                setPageSize(size)
              }
            } }
             />
        </Fragment>
    );
}

export default BannerList;
```

此时发现页码的配置为英文，需要设置为中文
在src/index.js
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import store from './store/index'

ReactDOM.render(
    <Provider store = { store } >
        <ConfigProvider locale = { zhCN }>
        <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)
```

删除时不考虑请求服务器，纯前端操作
banner/Index.jsx
```jsx
 import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space, Image, Popconfirm } from 'antd'
// import { loadBannerList } from './../../api/banner'
  

 
const BannerList = (props) => {

  const [ bannerList, setBannerList ] = useState([])
  //设置分页
  const [pageSize, setPageSize] = useState(5)
  const [ total, setTotal ] = useState(0)
  const [ current, setCurrent ] = useState(1)

  useEffect(() => {
    fetch('/lunbo.json').then(res => res.json()).then(result => {
      console.log(result)
      setBannerList(result.data)
    })
  }, [])

  const deleteItem = (bannberid, index) => () =>  {
    console.log(bannberid)
    // 在这里删除单条数据,并重新拉取数据
    let arr = JSON.parse(JSON.stringify(bannerList))
    arr.splice(index, 1)
    setBannerList(arr)
    setTotal(total - 1)
    setCurrent(Math.floor(total % pageSize === 1 ? (current -1) : current))
  }

  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => {
        return (
          <Image src={ text } width="60px" height="60px" />
        )
      }
    },
    {
      title: '链接地址',
      align: 'center',
      dataIndex: 'link',
      key: 'link',
    },
    {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>  
                <Space>
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={ deleteItem(record.bannerid, (current - 1) * pageSize + index) }
                  okText="确定"
                  cancelText="取消"
                >
                  <span style={{ color: '#f00', cursor: 'pointer' }}>删除</span>
                </Popconfirm>
                </Space>
                </>
            )
        }
      },
  ];

  


    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            <Table 
            rowKey={ (record) => record.bannerid }
            dataSource={bannerList}  
            columns={columns}
            bordered={ true } //边框属性
            pagination={ {
              position: ['bottomLeft'],
              showSizeChanger: true,
              pageSizeOptions: [10 ,15, 20,50],
              showQuickJumper: true,
              pageSize: pageSize,
              // hideOnSinglePage: true //慎用，不可逆
              showTotal: (total, range) => {
                console.log(total, range)
                return `共有${ total }条数据`
              },
              total: total,
              current: current,
              onChange: (page, pageSize) => {
                setCurrent(page)
              },
              onShowSizeChange: (current, size) => {
                setPageSize(size)
              }
            } }
             />
        </Fragment>
    );
}

export default BannerList;

```
### 9，表格的复选选择框
banner/Index.jsx
```jsx
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space, Image, Popconfirm } from 'antd'
// import { loadBannerList } from './../../api/banner'
  

 
const BannerList = (props) => {

  const [ bannerList, setBannerList ] = useState([])
  //设置分页
  const [pageSize, setPageSize] = useState(5)
  const [ total, setTotal ] = useState(0)
  const [ current, setCurrent ] = useState(1)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    fetch('/lunbo.json').then(res => res.json()).then(result => {
      console.log(result)
      setBannerList(result.data)
    })
  }, [])

  const deleteItem = (bannberid, index) => () =>  {
    console.log(bannberid)
    // 在这里删除单条数据,并重新拉取数据
    let arr = JSON.parse(JSON.stringify(bannerList))
    arr.splice(index, 1)
    setBannerList(arr)
    setTotal(total - 1)
    setCurrent(Math.floor(total % pageSize === 1 ? (current -1) : current))
  }

  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => {
        return (
          <Image src={ text } width="60px" height="60px" />
        )
      }
    },
    {
      title: '链接地址',
      align: 'center',
      dataIndex: 'link',
      key: 'link',
    },
    {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>  
                <Space>
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={ deleteItem(record.bannerid, (current - 1) * pageSize + index) }
                  okText="确定"
                  cancelText="取消"
                >
                  <span style={{ color: '#f00', cursor: 'pointer' }}>删除</span>
                </Popconfirm>
                </Space>
                </>
            )
        }
      },
  ];

  
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRows)
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys, //当前页面选中的项
    onChange: onSelectChange, //获取选中的值
    // selections: [
    //   Table.SELECTION_ALL,
    //   Table.SELECTION_INVERT,
    //   Table.SELECTION_NONE,
    //   {
    //     key: 'odd',
    //     text: 'Select Odd Row',
    //     onSelect: changableRowKeys => {
    //       let newSelectedRowKeys = [];
    //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //         if (index % 2 !== 0) {
    //           return false;
    //         }
    //         return true;
    //       });
    //       setSelectedRowKeys(newSelectedRowKeys)
    //     },
    //   },
    //   {
    //     key: 'even',
    //     text: 'Select Even Row',
    //     onSelect: changableRowKeys => {
    //       let newSelectedRowKeys = [];
    //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //         if (index % 2 !== 0) {
    //           return true;
    //         }
    //         return false;
    //       });
    //       setSelectedRowKeys(newSelectedRowKeys)
    //     },
    //   },
    // ],
  };
  


    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            {
              selectedRowKeys.length > 0 ? <Button type="primary" style={{ marginLeft: '15px' }}>批量删除</Button> : null
            }
            <Table 
            rowSelection={rowSelection}
            rowKey={ (record) => record.bannerid }
            scroll={{ y: 600 }}
            dataSource={bannerList}  
            columns={columns}
            bordered={ true } //边框属性
            pagination={ {
              position: ['bottomLeft'],
              showSizeChanger: true,
              pageSizeOptions: [10 ,15, 20,50],
              showQuickJumper: true,
              pageSize: pageSize,
              // hideOnSinglePage: true //慎用，不可逆
              showTotal: (total, range) => {
                // console.log(total, range)
                return `共有${ total }条数据`
              },
              total: total,
              current: current,
              onChange: (page, pageSize) => {
                setCurrent(page)
              },
              onShowSizeChange: (current, size) => {
                setPageSize(size)
              }
            } }
             />
        </Fragment>
    );
}

export default BannerList;

```

## 16 快捷导航实现
 ### 1, 抓取数据-分类 public/category.json

 ### 2,前端渲染数据 navgator/Category.jsx
  参照轮播图列表渲染分类

 ```jsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd'

const NavgatorCategory = () => {
    const [categorylist, setCategoryList] = useState([])
    useEffect(() => {
        fetch('/category.json').then(res => res.json()).then(result => {
            // console.log(result)
            setCategoryList(result.result.data)
        })
    }, [])
    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ index + 1 }</span>
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        }
    ]
    return (
       <>
        <Table rowKey={ record => record.id  } pagination={ false }  dataSource={categorylist} columns={columns} />
       </>
    );
}
export default NavgatorCategory;
 ```
### 3,渲染导航列表 navgator/List.jsx

```jsx
import React, { useEffect, useState } from 'react';
import { Table, Image, Button, Space } from 'antd'

const NavgatorList = () => {
    const [navlist, setNavList] = useState([])

    useEffect(() => {
        fetch('/navlist.json').then(res => res.json()).then(result => {
            // console.log(result)
            setNavList(result.result.data)
        })
    }, [])

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => {
                return (
                    <span>{ index + 1 }</span>
                )
            }
        },
        {
            title: '分类',
            dataIndex: 'categoryname',
            key: 'categoryname'
        },
        {
            title: '分类',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '分类图标',
            dataIndex: 'icon',
            key: 'icon',
            render: (text) => {
                return (
                    <Image src={ text } />
                )
            }
        },
        {
            title: '操作',
            render: (text) => {
                return (
                    <Space>
                        <Button type="primary" >编辑</Button>
                        <Button type="primary" >删除</Button>
                    </Space>
                )
            }
        }
    ]


    return (
       <>
        <Table rowKey={ record => record.navid } dataSource={ navlist } columns={ columns } scroll={{ y: 650 }} />
       </>
    );
}

export default NavgatorList;

```

### 4, 首页的导航列表
navGator/HomeList.jsx
穿梭框组件
```jsx
import React, { useState, useEffect } from 'react';
import { Transfer, Image, Space, message } from 'antd';


const NavigatorHomeList = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [navlist, setNavList]  = useState([])

  useEffect(() => {
      fetch('/navlist.json').then(res => res.json()).then(result => {
        setNavList(result.result.data)
      })
  }, [])

  // 点击左右箭头时的事件
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    //在这里把nextTargetKeys用接口传递到后端
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
      // 最多选择10条数据
    if((sourceSelectedKeys.length + targetKeys.length) > 10) {
        message.error('最多选择10项数据', 2)
    }else {
        // 表示当前的数据被选中
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    }
  };

  const onScroll = (direction, e) => {
    // console.log('direction:', direction);
    // console.log('target:', e.target);
  };

  return (
    <Transfer
      dataSource={navlist}
      rowKey={ record => record.navid }
      titles={['所有导航', '选中导航']}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      listStyle={{ width: '40%', height: 600 }}
      render={ (item) => {
          return (
              <Space>
                  <Image src={ item.icon } width={ 20 } height={ 20 } />
                  <span>{ item.name }</span>
              </Space>
          )
      } }
    />
  );
};

export default NavigatorHomeList;
```

## 17，商品管理

### 1,创建页面
views/product/List.jsx
```jsx
import React from 'react';

const List = () => {
    return (
        <div>
            商品列表
        </div>
    );
}

export default List;
```
### 2， 在路由文件中把商品管理添加到配置中
router/meus.js
```js
import React, { lazy } from 'react'
import {
    HomeOutlined,
    PictureOutlined,
    MenuOutlined,
    LinkOutlined,
    OrderedListOutlined,
    PicRightOutlined,
    DashOutlined,
    FieldTimeOutlined,
    UnorderedListOutlined,
    UserOutlined
  } from '@ant-design/icons';

const menus = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            hidden: true
        }
    },
    {
        path: '/home',
        title: '系统首页',
        icon: <HomeOutlined/>,
        component: lazy(() => import('./../views/home/Index'))
    },
    {
        path: '/bannermanager',
        title: '轮播图管理',
        icon: <PictureOutlined />,
        redirect: '/bannermanager/list',
        children: [
            {
                path: '/bannermanager/list',
                title: '轮播图列表',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/banner/Index'))
            }, 
            {
                path: '/bannermanager/add',
                title: '添加轮播图',
                icon: <MenuOutlined />,
                component: lazy(() => import('./../views/banner/Add')),
                meta: {
                    hidden: true
                }
            }, 
        ]
    },
    {
        path: '/navigatormanager',
        title: '快捷导航管理',
        icon: <LinkOutlined />,
        redirect: '/navigatormanager/list',
        children: [
            {
                path: '/navigatormanager/list',
                title: '导航列表',
                icon: <OrderedListOutlined />,
                component: lazy(() => import('./../views/navgator/List'))
            }, 
            {
                path: '/navigatormanager/category',
                title: '导航分类',
                icon: <PicRightOutlined />,
                component: lazy(() => import('./../views/navgator/Category'))
            }, 
            {
                path: '/navigatormanager/homelist',
                title: '首页导航',
                icon: <DashOutlined />,
                component: lazy(() => import('./../views/navgator/HomeList'))
            }, 
        ]
    },
    {
        path: '/seckillmanager',
        title: '秒杀管理',
        icon: <FieldTimeOutlined />,
        redirect: '/seckillmanager/list',
        children: [
            {
                path: '/seckillmanager/list',
                title: '首页秒杀列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/seckill/List'))
            }, 
        ]
    },
    {
        path: '/productmanager',
        title: '商品管理',
        icon: <FieldTimeOutlined />,
        redirect: '/productmanager/list',
        children: [
            {
                path: '/productmanager/list',
                title: '商品列表',
                icon: <UnorderedListOutlined />,
                component: lazy(() => import('./../views/product/List'))
            }, 
        ]
    },
    {
        path: '/usermanager',
        title: '用户管理',
        icon: <UserOutlined />,
        redirect: '/usermanager/list',
        children: [
            {
                path: '/usermanager/list',
                title: '用户列表',
                icon: <UserOutlined />,
                component: lazy(() => import('./../views/user/List'))
            }
        ]
    },
    {
        path: '/setting',
        title: '用户设置',
        icon: <UserOutlined />,
        component: lazy(() => import('../views/setting/Index')),
        meta: {
            hidden: true
        }
    }
]

export default menus
```
### 3, 渲染商品列表
views/List.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { Table } from 'antd'

const List = () => {

    const [productList, setProList] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname'
        }
    ]

    useEffect(() => {
       fetch('/product.json').then(res => res.json()).then(result => {
           setProList(result.result)
           setTotal(result.result.length)
       })
    }, []);

    return (
        <>
        <Table rowKey={ record => record.id }
         dataSource={ productList }
         columns={ columns }
         pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: [10,15,20,50],
            total: total,
             current: current,
             pageSize: pageSize,
             showTotal: (total, range) => {
                 return `共有${total}条数据`
             },
             onChange: (page, pageSize) => {
                setCurrent(page)
             },
             onShowSizeChange: (current, size) => {
                 setPageSize(size)
             }
         }}
         />
        </>
    );
}

export default List;

```

### 4,美化表格
```jsx
import React, { useState, useEffect } from 'react';
import { Table, Image, Switch, Space, Button } from 'antd'

const List = () => {

    const [productList, setProList] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 150
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 150
            
        },
        {
            title: '商品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: 150,
            key: 'img',
            render: (text, record, index) => {
                return (
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            },
            align: 'center'
        },
        {
            title: '商品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 150,
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150
        },
        {
            title: '商品描述',
            dataIndex: 'descri',
            key: 'descri',
            width: 500,
            align: 'center'
        },
        {
            title: '是否秒杀',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch checked={ text*1 === 1 } onChange={ (checked) => {
                            // const tempArr = productList
                            // tempArr[index].isKill = checked * 1
                            // sessionStorage.setItem('admin_product', JSON.stringify(tempArr))
                            // setProList(tempArr)
                        }
                    } />
                )
            }
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch checked={ text*1 === 1 } />
                )
            }
        },
        {
            title: '上架状态',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text) => {
                return(
                    <Switch checked={ text*1 === 1 } />
                )
            }
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            align: 'center',
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" danger>删除</Button>
                    </Space>
                )
            }
        }
    ]

    useEffect(() => {
        if(sessionStorage.getItem('admin_product')) {
            console.log('222')
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_product'))
            setProList(cacheArr)
            setTotal(cacheArr.length)
        } else {
            fetch('/product.json').then(res => res.json()).then(result => {
                sessionStorage.setItem('admin_product', JSON.stringify(result.result))
                setProList(result.result)
                setTotal(result.result.length)
            })
        }
    }, []);


    return (
        <>
        <Table rowKey={ record => record.id }
         dataSource={ productList }
         columns={ columns }
         pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: [10,15,20,50],
            total: total,
             current: current,
             pageSize: pageSize,
             showTotal: (total, range) => {
                 return `共有${total}条数据`
             },
             onChange: (page, pageSize) => {
                setCurrent(page)
             },
             onShowSizeChange: (current, size) => {
                 setPageSize(size)
             }
         }}
         scroll={{ y: 650, x: 1400 }}
         />
        </>
    );
}

export default List;

```
### 5，秒杀可以切换开关
// 需要设置defaultChecked的值
```jsx
import React, { useState, useEffect } from 'react';
import { Table, Image, Switch, Space, Button } from 'antd'

const List = () => {

    const [productList, setProductList] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        if(sessionStorage.getItem('admin_product')) {
            console.log('222')
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_product'))
            setProductList(cacheArr)
            setTotal(cacheArr.length)
        } else {
            fetch('/product.json').then(res => res.json()).then(result => {
                sessionStorage.setItem('admin_product', JSON.stringify(result.result))
                setProductList(result.result)
                setTotal(result.result.length)
            })
        }
    }, []);

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 150
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 150
            
        },
        {
            title: '商品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: 150,
            key: 'img',
            render: (text, record, index) => {
                return (
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            },
            align: 'center'
        },
        {
            title: '商品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 150,
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150
        },
        {
            title: '商品描述',
            dataIndex: 'descri',
            key: 'descri',
            width: 500,
            align: 'center'
        },
        {
            title: '是否秒杀',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    console.log(checked)
                    const arr = productList
                    arr[index].isKill = checked
                    sessionStorage.setItem('admin_product', JSON.stringify(arr))
                    setProductList(arr)
                }}/>
            }
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch checked={ text*1 === 1 } />
                )
            }
        },
        {
            title: '上架状态',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text) => {
                return(
                    <Switch checked={ text*1 === 1 } />
                )
            }
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            align: 'center',
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" danger>删除</Button>
                    </Space>
                )
            }
        }
    ]


    return (
        <>
        <Table rowKey={ record => record.id }
         dataSource={ productList }
         columns={ columns }
         pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: [10,15,20,50],
            total: total,
             current: current,
             pageSize: pageSize,
             showTotal: (total, range) => {
                 return `共有${total}条数据`
             },
             onChange: (page, pageSize) => {
                setCurrent(page)
             },
             onShowSizeChange: (current, size) => {
                 setPageSize(size)
             }
         }}
         scroll={{ y: 650, x: 1400 }}
         />
        </>
    );
}

export default List;

```
不使用自带的分页器，
### 7，自定义分页器 product/List.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { Table, Image, Switch, Space, Button, Pagination } from 'antd'

const List = () => {

    const [productList, setProductList] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        if(sessionStorage.getItem('admin_product')) {
            console.log('222')
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_product'))
            setProductList(cacheArr)
            setTotal(cacheArr.length)
        } else {
            fetch('/product.json').then(res => res.json()).then(result => {
                sessionStorage.setItem('admin_product', JSON.stringify(result.result))
                setProductList(result.result)
                setTotal(result.result.length)
            })
        }
    }, []);

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 150
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 150
            
        },
        {
            title: '商品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: 150,
            key: 'img',
            render: (text, record, index) => {
                return (
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            },
            align: 'center'
        },
        {
            title: '商品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 150,
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150
        },
        {
            title: '商品描述',
            dataIndex: 'descri',
            key: 'descri',
            width: 500,
            align: 'center'
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '上架状态',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '是否秒杀',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    console.log(checked)
                    const arr = productList
                    arr[index].isKill = checked
                    sessionStorage.setItem('admin_product', JSON.stringify(arr))
                    setProductList(arr)
                }}/>
            }
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            align: 'center',
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" danger>删除</Button>
                    </Space>
                )
            }
        }
    ]

    const showTotal = (total) => {
        return `共有 ${total} 条数据`;
      }
    const changeCurrent = (page, pageSize) => {
        //在这里请求新数据，并修改productList和current的值
        setCurrent(page)
    }

    const showSizeChange = (current, size) => {
        setPageSize(size)
    }
      

    return (
        <>
        <Table rowKey={ record => record.id }
         dataSource={ productList }
         columns={ columns }
         pagination={ false }
        //  pagination={{
        //     showSizeChanger: true,
        //     showQuickJumper: true,
        //     pageSizeOptions: [10,15,20,50],
        //     total: total,
        //      current: current,
        //      pageSize: pageSize,
        //      showTotal: (total, range) => {
        //          return `共有${total}条数据`
        //      },
        //      onChange: (page, pageSize) => {
        //         setCurrent(page)
        //      },
        //      onShowSizeChange: (current, size) => {
        //          setPageSize(size)
        //      }
        //  }}
         scroll={{ y: 700, x: 1400 }}
         />
         <Pagination 
         showQuickJumper 
         showSizeChanger
         current = { current }
         pageSize = { pageSize } 
         total = { total }
         showTotal={showTotal}
         onChange = { changeCurrent }
         onShowSizeChange={ showSizeChange }
         />
        </>
    );
}

export default List;
```

如果添加正确的序号，还得修改pageSize的值

### 8, 商品管理排序
```jsx
import React, { useState, useEffect } from 'react';
import { Table, Image, Switch, Space, Button, Pagination } from 'antd'

const List = () => {

    const [productList, setProductList] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        if(sessionStorage.getItem('admin_product')) {
            console.log('222')
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_product'))
            setProductList(cacheArr)
            setTotal(cacheArr.length)
        } else {
            fetch('/product.json').then(res => res.json()).then(result => {
                sessionStorage.setItem('admin_product', JSON.stringify(result.result))
                setProductList(result.result)
                setTotal(result.result.length)
            })
        }
    }, []);

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 150
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 150
            
        },
        {
            title: '商品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: 150,
            key: 'img',
            render: (text, record, index) => {
                return (
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            },
            align: 'center'
        },
        {
            title: '商品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a.originPrice - b.originPrice,
                multiple: 1
            }
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150,
            sorter: { // 这种方式是属于多列排序，也可以直接设置sorter实现单列排序
                compare: (a, b) => a.newPrice - b.newPrice,
                multiple: 2
            }
        },
        {
            title: '商品描述',
            dataIndex: 'descri',
            key: 'descri',
            width: 500,
            align: 'center'
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '上架状态',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '是否秒杀',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    console.log(checked)
                    const arr = productList
                    arr[index].isKill = checked
                    sessionStorage.setItem('admin_product', JSON.stringify(arr))
                    setProductList(arr)
                }}/>
            }
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            align: 'center',
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" danger>删除</Button>
                    </Space>
                )
            }
        }
    ]

    const showTotal = (total) => {
        return `共有 ${total} 条数据`;
      }
    const changeCurrent = (page, pageSize) => {
        //在这里请求新数据，并修改productList和current的值
        setCurrent(page)
    }

    const showSizeChange = (current, size) => {
        setPageSize(size)
    }
      

    return (
        <>
        <Table rowKey={ record => record.id }
         dataSource={ productList }
         columns={ columns }
         pagination={ false }
        //  pagination={{
        //     showSizeChanger: true,
        //     showQuickJumper: true,
        //     pageSizeOptions: [10,15,20,50],
        //     total: total,
        //      current: current,
        //      pageSize: pageSize,
        //      showTotal: (total, range) => {
        //          return `共有${total}条数据`
        //      },
        //      onChange: (page, pageSize) => {
        //         setCurrent(page)
        //      },
        //      onShowSizeChange: (current, size) => {
        //          setPageSize(size)
        //      }
        //  }}
         scroll={{ y: 700, x: 1400 }}
         />
         <Pagination 
         showQuickJumper 
         showSizeChanger
         current = { current }
         pageSize = { pageSize } 
         total = { total }
         showTotal={showTotal}
         onChange = { changeCurrent }
         onShowSizeChange={ showSizeChange }
         />
        </>
    );
}

export default List;

```

### 9，筛选

### 10, 自定义筛选组件 product/SortList.jsx
```jsx
import React from "react";
import { Form, Button, Row, Col, Input, Select } from "antd";

const { Option } = Select

const SortList = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col span={3}>
                        <Form.Item
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Input something!",
                                },
                            ]}
                        >
                            <Select>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="search"
                            rules={[
                                {
                                    required: true,
                                    message: "Input something!",
                                },
                            ]}
                        >
                            <Input placeholder="输入关键词搜索产品" />
                        </Form.Item>
                    </Col>
                    <Col
                        span={4}
                    >
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default SortList;

```
### 11,渲染数据 views/product/SortList.jsx
```jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Input, Select } from "antd";
// import { getProCategory, searchPro } from './../../api/pro'
import { Table, Image, Space, Switch} from 'antd'

const { Option } = Select

const SortList = () => {
    const [ categoryList, setCategoryList ] = useState([])
    const [ proList, setproList ] = useState([])

    useEffect(() => {
        fetch('/procategory.json').then(res => res.json()).then(result => {
            console.log(result)
            setCategoryList(result.result)
        })
    }, [])

    useEffect(() => {
        fetch('/product.json').then(res => res.json()).then(result => {
            sessionStorage.setItem('admin_product', JSON.stringify(result.result))
            setproList(result.result)
        })
    }, [])

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 100
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 100
            
        },
        {
            title: '商品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: 150,
            key: 'img',
            render: (text, record, index) => {
                return (
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            },
            align: 'center'
        },
        {
            title: '商品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a.originPrice - b.originPrice,
                multiple: 1
            }
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a.newPrice - b.newPrice,
                multiple: 2
            }
        },
        {
            title: '商品描述',
            dataIndex: 'descri',
            key: 'descri',
            width: 500,
            align: 'center'
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '上架状态',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '是否秒杀',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    console.log(checked)
                    const arr = proList
                    arr[index].isKill = checked
                    sessionStorage.setItem('admin_product', JSON.stringify(arr))
                    setproList(arr)
                }}/>
            }
        },
        {
            title: '操作',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" danger>删除</Button>
                    </Space>
                )
            }
        }
    ]

    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        // 在这里根据参数查询产品列表,因为没有使用axios，暂时使用fetch请求本地数据代替
        fetch('/product.json').then(res => res.json()).then(result => {
            setproList(result.result)
        })
    };

    return (
        <>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                initialValues={{
                    category: ''
                }}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col span={3}>
                        <Form.Item
                            name="category"
                        >
                            <Select showSearch>
                            <Option value="">全部</Option>
                                {
                                    categoryList.map((item, index) => {
                                        return (
                                            <Option key={ index } value={ item.categoryname }>{ item.categoryname }</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="search"
                        >
                            <Input placeholder="输入关键词搜索产品" allowClear />
                        </Form.Item>
                    </Col>
                    <Col
                        span={4}
                    >
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table rowKey={ record => record.id  } dataSource={ proList } columns={ columns } />
        </>
    );
};

export default SortList;

```



## 18, 添加首页数据管理菜单 
views/homedata/SeckillList.jsx
views/homedata/RecomendList.jsx

并在router/menu.js中配置菜单

## 19,注册用户
views/user/Register.jsx
并且配置menu.js左侧菜单
```jsx
import React from 'react';
import { Form, Input, Button } from 'antd';

const { Search } = Input

const Register = () => {

    const [myForm] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);
      }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      }

      const sendCode = (values) => {
        console.log(myForm.getFieldValue())
      }

    return (
        <Form
      form={ myForm }
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, message: '请输入手机号!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="手机验证码"
        name="telcode"
        rules={[{ required: true, message: '请输入手机验证码!' }]}
      >
        <Search enterButton="发送短信验证码" onSearch={ sendCode } disabled />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    );
}

export default Register;

```
如果手机号码验证不通过，发送短信验证码的按钮不可以点击
```jsx
const [flag, setFlag] = useState(true)

const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      const handlerPhone = (e) => {
        //   console.log(e.target.value)
          //在这里正则验证手机号
          phoneReg.test(e.target.value) ? setFlag(false) : setFlag(true)
      }
<Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, message: '请输入手机号!' }]}
      >
        <Input maxLength={ 11 } onChange={ handlerPhone } />
      </Form.Item>
      <Form.Item
        label="手机验证码"
        name="telcode"
        rules={[{ required: true, message: '请输入手机验证码!' }]}
      >
        <Search enterButton="发送短信验证码" onSearch={ sendCode } disabled = { flag } />
</Form.Item>
```
如果需要分步骤实现注册功能 views/user/Register.jsx
```jsx
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Steps, message } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "第一步",
    content: "输入手机号",
  },
  {
    title: "第二步",
    content: "输入验证码",
  },
  {
    title: "第三步",
    content: "输入密码",
  },
];

const Register = () => {
  const [myForm] = Form.useForm();
  const [flag, setFlag] = useState(true);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const sendCode = (values) => {
    console.log(myForm.getFieldValue());
  };

  const phoneReg =
    /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  const handlerPhone = (e) => {
    //   console.log(e.target.value)
    //在这里正则验证手机号
    phoneReg.test(e.target.value) ? setFlag(false) : setFlag(true);
  };

  //步骤条
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

//   const prev = () => {
//     setCurrent(current - 1);
//   };

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        form={myForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {current === 0 && (
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Row>
              <Col span={24}>
                <Input maxLength={11} onChange={handlerPhone} />
              </Col>
            </Row>
          </Form.Item>
        )}
        {current === 1 && (
          <Form.Item
            label="手机验证码"
            name="telcode"
            rules={[{ required: true, message: "请输入手机验证码!" }]}
          >
            <Row>
              <Col span={16}>
                <Input />
              </Col>
              <Col span={8}>
                <Button type="primary" onClick={sendCode} disabled={flag}>
                  发送验证码
                </Button>
              </Col>
            </Row>
          </Form.Item>
        )}

        {current === 2 && (
          <>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Row>
                <Col span={24}>
                  <Input.Password />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            {current === steps.length - 1 && (
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => message.success("Processing complete!")}
                >
                    注册
                </Button>
            )}
            </Form.Item>
          </>
        )}
      </Form>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {/* {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )} */}
      </div>
    </>
  );
};

export default Register;

```
发送验证码倒计时效果
```jsx
const [flag, setFlag] = useState(true);
const [text, setText] = useState('发送短信验证码')


 const sendCode = (values) => {
    // console.log(myForm.getFieldValue());
    let timer = null
    let time = 10
    timer = setInterval(() => {
        time -- 
        setText(time + 's后重新发送')
        setFlag(true)
        if(time <= 0) {
            clearInterval(timer)
            setText('发送短信验证码')
            setFlag(false)
            time = 10
        }
    }, 1000)
  };
```
配合Steps以及表单实现注册 Register.jsx
```jsx
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Steps } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "第一步",
    content: "输入手机号",
  },
  {
    title: "第二步",
    content: "输入验证码",
  },
  {
    title: "第三步",
    content: "输入密码",
  },
];

const Register = () => {
  const [myForm] = Form.useForm();
  const [flag, setFlag] = useState(true);
  const [text, setText] = useState('发送短信验证码')
  //步骤条
  const [current, setCurrent] = React.useState(0);
  const [phone, setPhone] = useState('')
  const [telcode, setTelCode] = useState('')
  const [pass, setPass] = useState('')
  const [phoneflag, setPhoneFlag] = useState(false)
  const [telcodeFlag, setTelCodFlag] = useState(false)
  const [passflag, setPassFlag] = useState(false)


  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  const handlerPhone = (e) => {
    //   console.log(e.target.value)
    //在这里正则验证手机号
    if(phoneReg.test(e.target.value)) {
        setFlag(false) 
        setPhone(e.target.value)
        setPhoneFlag(true)
    } else {
        setFlag(true)
    }
  };

  const sendCode = (values) => {
    // console.log(myForm.getFieldValue());
    let timer = null
    let time = 10
    timer = setInterval(() => {
        time -- 
        setText(time + 's后重新发送')
        setFlag(true)
        if(time <= 0) {
            clearInterval(timer)
            setText('发送短信验证码')
            setFlag(false)
            time = 10
        }
    }, 1000)
  };

  const handlerTelCode = (e) => {
    //   console.log(e.target.value)
      setTelCode(e.target.value)
      setTelCodFlag(true)
  }

  const handlerPass = (e) => {
    //   console.log(e.target.value)
      setPass(e.target.value)
      setPassFlag(true)
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const submitForm = (e) => {
    console.log('phone:', phone, 'telcode:', telcode, 'pass:', pass)
  }

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        form={myForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginTop: '40px' }}
      >
        {current === 0 && (
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Row>
              <Col span={24}>
                <Input maxLength={11} onChange={handlerPhone} />
                {phoneflag && (
                <Button type="primary" style={{ marginTop: '30px' }} onClick={() => next()}>
                    下一步
                </Button>
                )}
              </Col>
            </Row>
          </Form.Item>
        )}
        {current === 1 && (
          <Form.Item
            label="手机验证码"
            name="telcode"
            rules={[{ required: true, message: "请输入手机验证码!" }]}
          >
            <Row>
              <Col span={16}>
                <Input onChange={ handlerTelCode } />
              </Col>
              <Col span={8}>
                <Button type="primary"  onClick={sendCode} disabled={flag}>
                  { text }
                </Button>
              </Col>
              {telcodeFlag && (
                <Button type="primary" style={{ marginTop: '30px' }} onClick={() => next()}>
                    下一步
                </Button>
                )}
            </Row>
          </Form.Item>
        )}

        {current === 2 && (
          <>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Row>
                <Col span={24}>
                  <Input.Password onChange={ handlerPass } />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            {passflag && (
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={ submitForm }
                >
                    注册
                </Button>
            )}
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

export default Register;

```


## 20, 渲染用户列表
views/user/List.jsx
同时添加了手机号以及日期的处理组件
```jsx
import React, { useState, useEffect } from 'react';
import { Table, Avatar, Image } from 'antd'
import TelShow from './../../components/TelShow'
import TimeShow from './../../components/TimeShow'



const UserList = () => {
  const [userlist, setUserList] = useState([])

  useEffect(() => {
      async function fetchData() {
          const res = await fetch('/userlist.json').then(res => res.json())
          setUserList(res.result)
      }
      fetchData()
  },[])

  const columns = [
      {
          title: '序号',
          render: (text, record, index) => <span>{ index + 1 }</span>
      },
      {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 200,
          render: (text) => {
              return(
                  <TelShow tel={ text } />
              )
          }
      },
      {
          title: '头像',
          dataIndex: 'avator',
          render: (text, record, index) => {
              return (
                <Avatar src={<Image src={ text } style={{ width: 32 }} />} />
              )
          }
      },
      {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
      },
      {
          title: '用户等级',
          dataIndex: 'level',
          key: 'level'
      },
      {
          title: '注册时间',
          dataIndex: 'regtime',
          key: 'regtime',
          render: (text) => {
              return(
                  <TimeShow regTime={ text } />
              )
          }
      }
  ]


    return (
        <>
            <Table rowKey={ record => record.id }  dataSource={ userlist }  columns={ columns }/>
        </>
    );
}

export default UserList;

```
后续可以加上冻结以及解冻功能

## 21，后台管理系统登录功能

### 1，设计登录页面，以及配置登录路由

App.jsx配置路由，登录页面的要放在前面
```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './layout/main/Index'
import Login from './layout/Login'

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/login" component={ Login } />
                    <Route path="/" component={ Main }></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
```

layout/Login.jsx

```jsx
import React from "react";
import { Form, Input, Button } from "antd";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginpage">
      <div className="loginCom">
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
          <h1 style={{ textAlign:'center', marginBottom: '30px' }}>JD_ADMIN</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default Login;

```
### 2, 执行登录功能

在登录页面调用登录接口  Login.jsx
```jsx
import React from "react";
import { Form, Input, Button } from "antd";
import { adminLogin } from './../api/admin'

const Login = () => {
  const onFinish = (values) => {
    adminLogin(values).then(res => {
      console.log(res)
    })
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginpage">
      <div className="loginCom">
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
          <h1 style={{ textAlign:'center', marginBottom: '30px' }}>JD_ADMIN</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入账号!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default Login;

```

### 3， 思考问题

#### 1， 登录之后需要保存一些用户信息

  管理员名称username

  权限role

  前端登录状态loginstate

  后端的登录验证token

#### 2，统一添加token校验 

#### 3,封装登录信息保存到cookie中，安装js-cookie模块，封装utils/common.js
```js
import Cookies from 'js-cookie'

export function setItem (key, value) {
    Cookies.set(key, value)
}

export function getItem (key) {
   return  Cookies.get(key)
}

export function removeItem (key) {
    Cookies.remove(key)
}
```
#### 4，封装状态管理器用户模块

store/actionTypes.js
```js
const CHANGE_COLLAPSED = 'CHANGE_COLLAPSED' //左侧菜单收缩变量
const CHANGE_COLOR = 'CHANGE_COLOR' // 修改主题色


//登录相关
const CHANGE_ADMINNAME = 'CHANGE_ADMINNAME' //修改用户名称
const CHANGE_LOGINSTATE = 'CHANGE_LOGINSTATE' // 修改用户登录状态
const CHANGE_TOKEN = 'CHANGE_TOKEN' //修改用户token
const CHANGE_ROLE = 'CHANGE_ROLE' //修改用户role

export {
    CHANGE_COLLAPSED,
    CHANGE_COLOR,
    CHANGE_ADMINNAME,
    CHANGE_LOGINSTATE,
    CHANGE_TOKEN,
    CHANGE_ROLE
}
```

store/modules/user.js

```js
import { Map } from 'immutable'
import * as tyeps from './../actionTypes'
import { getItem } from './../../utils/common'

const reducer = (state = Map({
    adminname: getItem('adminname') || '',
    role: getItem('role') || '',
    loginState:  getItem('loginState') === 'true' || false,
    token: getItem('token') || ''
}), action) => {
    switch (action.type) {
        case tyeps.CHANGE_ADMINNAME:
            return state.set('adminname', action.payload)
        case tyeps.CHANGE_LOGINSTATE:
            return state.set('loginState', action.payload)
        case tyeps.CHANGE_TOKEN:
            return state.set('token', action.payload)
        case tyeps.CHANGE_ROLE:
            return state.set('role', action.payload)
        default:
           return state
    }
}


export default reducer
```
store/index.js 添加user模块到状态管理
```js
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk'

import commonReducer from './modules/common'
import userReducer from './modules/user'

const reducer = combineReducers({
    common: commonReducer,
    user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default  store

```
#### 5， 创建登录的actionCreator

封装登录接口 api/admin.js
```js
import request from './../utils/request'

export function adminLogin (params) {
   return  request.get('account.json', { params })
}
```

store/actionCreators/user.js
```js
import { adminLogin } from './../../api/admin'
import * as types from './../actionTypes'
const  userAction = (values) => {
    return (dispatch) => {
        return new Promise(resolve => {
            adminLogin(values).then(res => {
                console.log(res)
                console.log(res.data[values.username])
                // 修改状态
                dispatch({
                    type: types.CHANGE_ADMINNAME,
                    payload: res.data[values.username]['adminname']
                })
                dispatch({
                    type: types.CHANGE_TOKEN,
                    payload: res.data[values.username]['token']
                })
                dispatch({
                    type: types.CHANGE_LOGINSTATE,
                    payload: 'true'
                })
                dispatch({
                    type: types.CHANGE_ROLE,
                    payload: res.data[values.username]['roleid']
                })
                resolve(res.data[values.username])
            })
        })
    }
}

export default userAction
```

#### 6,改造登录组件 react-redux
 
 layout/Login.jsx
 ```jsx
import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from 'react-redux'  /// **** 添加connect
import userAction from './../store/actionCreators/user' //
import { setItem } from './../utils/common'

const mapDispatchToProps = (dispatch) => {
  return {
    login(values) {
      return dispatch(userAction(values)) 
      //这里注意要使用return， 得到的是promise对象
      //需要将promise返回给ui组件处理
    }
  }
}

const Login =  (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    props.login(values).then(res => {
      console.log(res)
      //在这里将用户信息存储到本地的cookie中
      setItem('adminname', res.adminname)
      setItem('role', res.roleid)
      setItem('token', res.token)
      setItem('loginState', 'true')

      //判断有没有上一页，没有则返回

    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginpage">
      <div className="loginCom">
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
          <h1 style={{ textAlign:'center', marginBottom: '30px' }}>JD_ADMIN</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入账号!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login); //改造组件
 ```

### 4, 封装axios的拦截器

utils/request.js
```js
import axios from 'axios'
// import { getItem } from './common'
import store from './../store/index'

const isDev = process.env.NODE_ENV === 'development'
const request = axios.create({
    baseURL: isDev ? '' : 'http://www.test.com/api' // 如果dev模式下跨域，按照这个配置，在package.json中配置proxy字段
    // baseURL: isDev ? 'http://39.99.182.33/api' : 'http://www.test.com/api'

})

//设置拦截器
// 添加请求拦截器 --- 所有的数据请求都需要先经过这个拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 -- 发送token -- 通过头部信息
    config.headers.common.token = store.getState.getIn(['user', 'token'])
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
export default request
```

### 5，前端验证用户的登录状态
App.jsx
```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Main from './layout/main/Index'
import Login from './layout/Login'
import { connect } from 'react-redux'

const mapState = (state) => {
    return {
        loginState: state.getIn(['user', 'loginState'])
    }
}
const App = ({ loginState }) => {
    return (
        <>
            <Router>
                <Switch>
                    {
                        loginState ? 
                        <Redirect path="/login" to="/" />
                        :
                        <Route path="/login" component={ Login } />
                    }
                    {/* <Route path="/login" component={ Login } /> */}
                    {
                        loginState ? 
                        <Route path="/" component={ Main }></Route> 
                        : 
                        <Redirect exact to="/login" />
                    }
                    
                </Switch>
            </Router>
        </>
    );
}

export default connect(mapState)(App);
```
### 6, 退出登录
在页面头部使用下拉菜单，实现退出登录功能，修改登录状态即可
layout/main/MainHeader.jsx
```jsx
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined
} from '@ant-design/icons';
import * as types from './../../store/actionTypes'
import { connect } from 'react-redux'
import Breadcrumb from './Breadcrumb'
import { setItem } from './../../utils/common'

const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed, color, changeColor, changeLoginState }) => {

    const toggle = () => {
        changeCollapsed()
    }

    const onClick = ({ key }) => {
      console.log(key)
      if(key === '2') {
        setItem('loginState', 'false')
        changeLoginState()
      }
    };
    
    const menu = (
      <Menu onClick={onClick}>
        <Menu.Item key="1">个人中心</Menu.Item>
        <Menu.Item key="2">退出登录</Menu.Item>
      </Menu>
    );

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',display: 'flex', backgroundColor: color  }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            <div style={{ width: '50px' }}>
            {
               collapsed ?  
               <MenuUnfoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={ toggle } />
                : 
               <MenuFoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={ toggle } />
            }
            </div>
            <div style={{ flex: 1}}>
              <Breadcrumb/>
            </div>
            <div style={{ flex: 1 }}>
            <input type="color" onChange={ (e) => {
              console.log(e.target.value)
              changeColor(e.target.value)
            } } />
            </div>
            <div style={{ marginRight: '20px'}}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                用户名：admin <DownOutlined />
              </a>
            </Dropdown>
            </div>
          </Header>
    );
}

export default connect( state => ({
        collapsed: state.getIn(['common', 'collapsed']),
        color: state.getIn(['common', 'color'])
    }), dispatch => ({
        changeCollapsed() {
            dispatch({
                type: types.CHANGE_COLLAPSED
            })
        },
        changeColor(payload) {
          dispatch({
            type: types.CHANGE_COLOR,
            payload
          })
        },
        changeLoginState () {
          dispatch({
            type: types.CHANGE_LOGINSTATE,
            payload: false
          })
        }
    }) )(MainHeader);

```

## 22, 权限管理

### 1，添加一个管理员的页面，只有超级管理员可见

views/user/AdminList.jsx 同时添加到路由配置中
```jsx
import React from 'react';

const AdminList = () => {
    return (
        <div>
            管理员列表
        </div>
    );
}

export default AdminList;

```

### 2，添加管理员--使用抽屉组件实现

views/user/AdminList.jsx

```jsx
import React, { useState } from 'react';
import { Table, Button, Drawer, Form, Input, Select } from 'antd'

const AdminList = () => {
    const [adminlist, setAdminList] = useState([])
    const [visible, setVisiable] = useState(false)
    const columns = []

    const finish = (values) => {
        console.log(values)
    }

    return (
       <>
        <Button type="primary" onClick={ () => setVisiable(true) } style={{ marginBottom: 20 }}>添加管理员</Button>
        <Table 
        dataSource={ adminlist } 
        columns={ columns } 
        rowKey = 'adminid'
        />
        <Drawer title="Basic Drawer" placement="right" width='500' onClose={() => setVisiable(false)} visible={visible}>
        <Form 
         onFinish={ finish }
         initialValues={{
             role: 1
         }}
        >
            <Form.Item 
            name="adminname"
            rules={[{
                required: true,
                message: '请输入管理员账号'
            }]}
            >
                <Input placeholder="请输入管理员账号"></Input>
            </Form.Item>
            <Form.Item 
            name="password"
            rules={[{
                    required: true,
                    message: '请输入管理员密码'
                }]}
            >
                <Input.Password placeholder="请输入管理员密码"/>
            </Form.Item>
            <Form.Item 
            name="role">
                <Select>
                    <Select.Option value={ 2 }>超级管理员</Select.Option>
                    <Select.Option value={ 1 }>管理员</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">添加</Button>
        </Form>
      </Drawer>
       </>
    );
}

export default AdminList;

```

添加树形菜单测试
```jsx
import React, { useState } from 'react';
import { Table, Button, Drawer, Form, Input, Select, Tree } from 'antd'
import menus from './../../router/menu'

function  getMenu (menus) {
    const arr  = []
    menus.forEach(item => {
        let childrenarr = []
        if(item.children) {
            childrenarr = getMenu(item.children)
        }
        item.key = item.path
        item.childrenarr && (item.children = childrenarr)
       !(item.meta && item.meta.hidden) && arr.push(item)
    })
    return arr
}

const treeData = getMenu(menus)

const AdminList = () => {
    const [adminlist, setAdminList] = useState([])
    const [visible, setVisiable] = useState(false)
    const columns = []

    const finish = (values) => {
        console.log(values)
    }

    return (
       <>
        <Button type="primary" onClick={ () => setVisiable(true) } style={{ marginBottom: 20 }}>添加管理员</Button>
        <Table 
        dataSource={ adminlist } 
        columns={ columns } 
        rowKey = 'adminid'
        />
        <Drawer title="Basic Drawer" placement="right" width='500' onClose={() => setVisiable(false)} visible={visible}>
        <Form 
         onFinish={ finish }
         initialValues={{
             role: 1
         }}
        >
            <Form.Item 
            name="adminname"
            rules={[{
                required: true,
                message: '请输入管理员账号'
            }]}
            >
                <Input placeholder="请输入管理员账号"></Input>
            </Form.Item>
            <Form.Item 
            name="password"
            rules={[{
                    required: true,
                    message: '请输入管理员密码'
                }]}
            >
                <Input.Password placeholder="请输入管理员密码"/>
            </Form.Item>
            <Form.Item 
            name="role">
                <Select>
                    <Select.Option value={ 2 }>超级管理员</Select.Option>
                    <Select.Option value={ 1 }>管理员</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">添加</Button>
        </Form>
      </Drawer>
      {/* 树形菜单 */}
        <Tree
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultExpandAll={ true }
        defaultSelectedKeys={['/home', '/bannermanager/list']}
        defaultCheckedKeys={['/home', '/bannermanager/list']}
        checkable
        treeData={treeData}
        onSelect={(selectedKeys, info) => {
            console.log('selected', selectedKeys, info)
        }}
        onCheck={(checkedKeys, info) => {
            console.log('checked', checkedKeys, info)
        }}
        />
       </>
    );
}

export default AdminList;

```


最终添加管理员版本，在menu.js中添加key值为path的值 views/user/AdminList.jsx
```jsx
import React, { useState } from 'react';
import { Table, Button, Drawer, Form, Input, Select, Tree } from 'antd'
import menus from './../../router/menu'

function  getMenu (menus) {
    const arr  = []
    menus.forEach(item => {
        let childrenarr = []
        if(item.children) {
            childrenarr = getMenu(item.children)
        }
        item.key = item.path
        item.childrenarr && (item.children = childrenarr)
       !(item.meta && item.meta.hidden) && arr.push(item)
    })
    return arr
}

const treeData = getMenu(menus)

const AdminList = () => {
    const [adminlist, setAdminList] = useState([])
    const [visible, setVisiable] = useState(false)

    const [adminname, setAdminName] = useState('')
    const [password, setPassWord] = useState('')
    const [role, setRole] = useState(1)
    const [checkedKeys, setCheckedKeys] = useState([])


    const columns = []

    const addAdmin = () => {
        console.log(adminname)
        console.log(password)
        console.log(role)
        console.log(checkedKeys)
    }
   

    return (
       <>
        <Button type="primary" onClick={ () => setVisiable(true) } style={{ marginBottom: 20 }}>添加管理员</Button>
        <Table 
        dataSource={ adminlist } 
        columns={ columns } 
        rowKey = 'adminid'
        />
        <Drawer 
           closable={ true }
            title="添加管理员" 
            placement="right" 
            width='500' 
            
            onClose={() => setVisiable(false)} 
            visible={visible}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" style={{ marginRight: 8 }}>取消</Button>
                    <Button type="primary" onClick={ addAdmin  }>添加</Button>
                </div>
            }
        >
        <Form>
            <Form.Item 
            name="adminname"
            rules={[{
                required: true,
                message: '请输入管理员账号'
            }]}>
                <Input placeholder="请输入管理员账号" onChange={ (e) => setAdminName(e.target.value) }></Input>
            </Form.Item>
            <Form.Item 
            name="password"
            rules={[{
                    required: true,
                    message: '请输入管理员密码'
                }]}>
                <Input.Password placeholder="请输入管理员密码" onChange={ (e) => setPassWord(e.target.value) }/>
            </Form.Item>
            <Form.Item 
            name="role">
                <Select onChange={ (value) => setRole(value) }>
                    <Select.Option value={ 2 }>超级管理员</Select.Option>
                    <Select.Option value={ 1 }>管理员</Select.Option>
                </Select>
            </Form.Item>
        </Form>
        {/* 树形菜单 */}
        <Tree
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultExpandAll={ true }
        // defaultSelectedKeys={['/home', '/bannermanager/list']}
        // defaultCheckedKeys={['/home', '/bannermanager/list']}
        checkable
        treeData={treeData}
        onSelect={(selectedKeys, info) => {
            // console.log('selected', selectedKeys, info)
        }}
        onCheck={(checkedKeys, info) => {
            console.log('checked', checkedKeys, info)
            setCheckedKeys(info.checkedNodes)
        }}/>
      </Drawer>
       </>
    );
}

export default AdminList;

```

退出登录，使用新添加的账号登录，此时左侧菜单应该按照权限渲染

按照管理员的账号去获取到应有的权限，再去渲染左侧菜单栏

如果没有权限，也要显示无权限页面403

## 23 ，渲染管理员的列表

## 24， 首页的数据统计

## 25 富文本编辑器

https://braft.margox.cn/

在react中插入html标签的时候使用dangerouslySetInnerHTML， 作用类似于vue中的v-html指令




# 二. node接口