# 1，创建项目
```js
npx create-react-app react-admin
```
# 2，配置装饰器(不是必须)
  
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
 # 3, 配置UI库
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

 # 4，修改目录结构
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
# 5, 搭建项目主结构

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

# 6, 设计左侧菜单栏
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

