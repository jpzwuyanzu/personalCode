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
+ 1.创建分reducer  store/modules/common.js

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

+ 2. 创建actiontypes.js
```js
const CHANGE_COLLAPSED = 'CHANGE_COLLAPSED' //左侧菜单收缩变量
export {
    CHANGE_COLLAPSED
}
```
+ 3.创建状态管理器 store/index.js
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

+ 4.入口文件引入状态管理器 src/index.js
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
+ 5. layout/main/MainHeader.jsx中使用状态管理器
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

+ 6. layout/main/Index.jsx
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
 ++ 1.前端页面构建 banner/Index.jsx
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
 ++ 2.添加轮播图的页面

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
++ 3. 添加页面的布局
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
++ 4. 调用轮播图接口

必须先封装axios

++ 5. 封装axios

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




# 二. node接口