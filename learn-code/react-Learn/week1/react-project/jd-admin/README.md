# 1,创建项目

 ```
 npx create-react-app  react-app
 ```

 # 2,配置装饰器(不是必须)

 ## 2-1, 安装模块

 ```
 npm install @babel/plugin-proposal-decorators  customize-cra  react-app-rewired -D
 ```

 ## 2-2, 根目录下创建config-overrides.js文件

 ```js
 const {override, addDecoratorsLegacy} = require("customize-cra")
 module.exports = override(
     addDecoratorsLegacy(), //配置装饰器模式
 )
 ```

 ## 2-3 修改package.json 运行命令
    ```json
    "scripts": {
    "start": "react-app-rewired start",  //update
    "build": "react-app-rewired build", //update
    "test": "react-app-rewired test",  //update
    "eject": "react-scripts eject"
  }
    ```

 # 3,配置ui库

 ## https://ant.design/docs/react/getting-started-cn 
 ## https://ant.design/docs/react/use-with-create-react-app-cn 

 ## 1, npm install antd -S
 ## 2, 删除src里边的目录内容 ，在index.css引入@import '~antd/dist/antd.css';

 # 4,修改目录结构
 ## src
  ### api
  ### layout 
  ### components 
  ### store 
  ### utils 
  ### views 

  # 5搭建项目主结构

  # 6移植app.jsx到layout/main/index.jsx

  # 7安装路由模块
   npm install react-router-dom -S

   修改App.jsx

   ```js
    import React from 'react'
    import {BrowserRouter  as Router, Route,Switch} from 'react-router-dom'
    import Main from './layout/main/Index'

    const App = () => {
      return (
      <Router>
        <Switch>
        <Route path = "/" component = {Main} />
        </Switch>
      </Router>
      )
    }
    export default App
   ```

   # 8分析项目
    1， 系统首页
    2， 轮播图管理 2-1轮播图列表
    3， 快捷导航管理  3-1导航的分类  3-2导航列表（添加导航）  3-3 首页的导航
    4， 秒杀管理 4-1 首页秒杀列表
    4， 广告管理 

    生成左侧菜单的基本配置信息- router/menu.js




# 9配置左侧菜单栏

 抽离菜单栏SideMenu.jsx


 # 10创建页面对应的组件 
  /views

  # 11点击左侧单跳转到对应的页面，配置路由
   使用路由的懒加载
   使用antd的 loading效果
   引入lazy Suspense ,其中Suspense中需要使用fallback
   ```js
   <Content
    className="site-layout-background"
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      position:'relative'
    }}
  >
    <Suspense fallback={<div className="loading"><Spin size="large"/></div>}>
    <Switch>
      <Route path="/" exact component = {lazy(() => import('../../views/home/Index'))}></Route>
    </Switch>
    </Suspense>
  </Content>
   ```

   不要轻易修改组件样式，可以根据自己的业务需求添加额外的标签
   结合路由的router-config  修改router文件夹下的menus.js
   
   使用路由懒加载
   ```js
   // 使用递归遍历路由配置
    renderRoute = (menus) => {
      return menus.map(item => {
        if(item.children) {
          return  this.renderRoute(item.children)
        } else {
          return (<Route
            key={item.path}
            path={item.path}  exact
            component = {item.component}
            ></Route>)
        }
      })
    }
   ```
   添加一个用户管理-用户列表页面

   优化项目，设置一个路由的显示组件，类比vue的route-view组件
   在router目录下创建一个RouterView.js
   ```js
import React, {Suspense} from 'react';
import {Route, Switch } from 'react-router-dom'
import menus from './menus'
import { Spin } from 'antd';

const RouterView = () => {
    // 使用递归遍历路由配置
  const renderRoute = (menus) => {
    return menus.map(item => {
      if(item.children) {
        return  renderRoute(item.children)
      } else {
        return (<Route
          key={item.path}
          path={item.path}  exact
          component = {item.component}
          ></Route>)
      }
    })
  }
  
    return (
        <Suspense fallback={<div className="loading"><Spin size="large"/></div>}>
            <Switch>
              {
                renderRoute(menus)
              }
            </Switch>
           </Suspense>
    );
}

export default RouterView;

   ```


疑问：  如果有的页面不需要在左侧菜单栏出现，如何处理？
```js
import React  from 'react';
import {  Menu } from 'antd';
import menus from '../../router/menus'

const { SubMenu } = Menu; //二级菜单标识
const SideMenu = () => {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
               {
                //    方便渲染多级菜单，递归渲染
                   renderMenus(menus)
               }
            </Menu>
        );
}

const  renderMenus = (menus) => {
    return (
        <>
            {
                menus.map((item) => {
                    if(item.children) {
                        // 多级菜单
                        return (
                            <SubMenu key={item.path} icon={item.icon} title={item.title}>
                                {
                                    renderMenus(item.children)
                                }
                            </SubMenu>
                        )
                    } else {
                        // 只有一级菜单
                        // 在这里可以控制当前路由是否是在需要通过左侧菜单渲染，通过meta标签判断
                        return item.meta && item.meta.hidden ? null :  <Menu.Item key={item.path} icon={item.icon}>
                        {item.title}
                        </Menu.Item>
                    }
                })
            }
        </>
    )
}

export default SideMenu;

```

# 10 点击菜单栏跳转页面
 
 使用withRouter实现编程式导航


 # 11 刷新页面选中状态消失，需要实现当前选中页面之后菜单的选中状态

 ```js
 //为了显示当前左侧菜单栏选中状态
    // defaultSelectedKeys   defaultSelectedKeys --- string[ key ] key就是path
    const { pathname } = useLocation() // /userMannager/list
    const type = '/' +  pathname.split('/')[1]

        return (
            <Menu 
            theme="dark" 
            mode="inline" 
            defaultSelectedKeys={[pathname]}   // {['/userMannager/list']} 数组
            defaultOpenKeys={[type]}  // {['/userMannager']} 数组
            onClick = {goPage}
            >
               {
                //    方便渲染多级菜单，递归渲染
                   renderMenus(menus)
               }
            </Menu>
        );
 ```

 # 12 抽离头部组件

  点击小图标莱展开折叠侧边栏
  使用状态管理器莱管理控制侧边栏展开折叠的状态

  npm install redux react-redux redux-thunk -D

  //如果需要使用持久化数据结构 immutable,这个不是必须的
  npm install immutable redux-innmutable -D
  //使用inmmutable的时候 设置数据使用set 获取数据使用getIn

## 1 创建分ruducer  common.js
```js
import { Map } from 'immutable'
import * as types from '../actiontypes'

const reducer = (state = Map({collapsed: false}),action) => {
    switch (action.type) {
        case types.CHANGE_CPLLAPSED:
            return state.set('collapsed', !state.get('collapsed'))
    
        default:
            return state
    }
}

export default reducer
```

## 2 创建actionTypes.js
```js
const CHANGE_CPLLAPSED = "CHANGE_CPLLAPSED" //左侧菜单栏切换
export {
    CHANGE_CPLLAPSED 
}
```

## 3 创建状态管理器 index.js
```js
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk'

import commonReducer from './modules/common'

const reducer  = combineReducers({
    common: commonReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store

```
## 4入口文件引入状态管理器 
 ```js
 import { Provider } from 'react-redux'

import store from './store'

import './index.css'

ReactDOM.render(
    <Provider store = { store }>
        <App/>
    </Provider>,
    document.getElementById('root')
)
 ```

 ## 5在组件中使用状态以及改变状态
```js
 import { connect } from 'react-redux'
  ......

 export default connect(state => ({
    collapsed: state.getIn(['common', 'collapsed'])
}), dispatch => ({
    changeCollapsed() {
        dispatch({
            type:types.CHANGE_CPLLAPSED
        })
    }
}))(MainHeader);
 ```

 ## 6 主界面控制侧边栏 main/index.js
 ```js
 @connect(state => {
  return {
    collapsed : state.getIn(['common', 'collapsed'])
  }
})
 ```

 # 13实现值展开一个父级菜单
  参考ui库中的menu组件

 # 14 实现面包屑导航

 # 15 轮播图管理
  ## 1 前端页面构建
  ## 2，构建react后台管理系统的轮播图添加页面
  ## 3， 调用相关的接口
  ## 4，封装axios 
  ### 1， yarn add axios 
  ```js
  import axios from 'axios'

  const isDev = process.env.NODE_ENV === 'development'

  const request = axios.create({
      baseURL: isDev ? 'http://localhost:3333/api' : 'http://www.dahe.com/api'
  })

  //设置拦截器

  export default request
  ```
  ### 2,配置跨域代理只需要在package.json文件中添加一句代理 （配置文件在没有抽离的情况下）
  ```json
  "proxy": "http://localhost:3333/api"
  ```

  ### 3,添加轮播成功返回轮播列表页面

   props.history.goBack() 返回上一页

  ### 接口文档的构建 apidoc

  ### 4，渲染商品列表数据


  #  16 设计登录页面，以及配置登录路由

  1, 在App.jsx中配置路由，要加在最前面
  2，layout下边新建一个Login.jsx
  3, 构建登录组件

  # 17 分析登录流程
   1， 需要全局的导航守卫
   2， 登录验证之后判断是否有上一层url， 如果有，登录之后跳转回去，如果没有跳转到首页
   3， 登录之后需要保存用户信息到本地，以及状态管理器
   4，登录失败直接提示
   5，需要保存在本地的信息：  用户名， 头像， 权限role  登录状态（loginState） token信息
   

  # 18 封装拦截器

  ```js
  import axios from 'axios' 
import store from './../store'
import  { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev ? '' : 'http://www.dahe.com/api'
})

//设置拦截器
// 添加请求拦截器-------所有的数据请求都会先经过这里
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么-- 发送token --- 设置请求头部header
    console.log(store.getState().user.token)
    config.headers.common.token = store.getState().getIn(['user', 'token'])
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code === '10119') {
    console.log('token失效')
    message.warning('token验证失败，重新登录！')
    //跳转至登录的页面
    setTimeout(() => {
      window.location.href="/login"
    }, 1000);
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default request
  ```
# 18如果页面没有请求的是欧封装导航守卫
    前端校验登录状态在App.jsx中实现

# 19 退出登录，在头部组件中修改状态以及本地的loginState实现

# 20 权限管理

## 1，添加一个管理员页面 --只有超级管理员可见
### 1, 添加管理员，使用抽屉组件
### 2， 将form表单改造成受控组件，通过onchang去获取值赋给state

## 超级管理员左侧菜单直接加载menus，其他的都是通过超级管理员创建的数据，加载左侧菜单需要从服务器端获取menus数据
## 这种方式并不好，主要是跟后台配合去实现这块业务







  
 



























##################################
# 服务端实现流程
# 16 node搭建服务
 ### 创建项目
  1 全局安装express脚手架
  2 创建项目 npx express jd-admin-api
  3 修改项目端口号 根目录下 bin/www
  4 配置项目长链接 npm install nodemon -g 或者是 yarn add nodemon global
  5 配置package.json
  ```.json
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
  ```
  ### 项目配置
   1,创建文件夹 
   
    2 安装mongoose 
   api(用来放api接口)  banner.js
   ```js
      var router = require('express').Router()
    router.get('/',(req,res,next) => {
        res.send('轮播图列表')
    })

    router.post('/add',(req,res,next) => {
        res.send('添加轮播图')
    })

    router.get('/delete',(req,res,next) => {
        res.send('删除单张轮播图')
    })

    router.get('/deleteAll',(req,res,next) => {
        res.send('删除所有轮播图')
    })

    module.exports = router
   ```
   
   
   sql db.js
   ```js
   var mongoose = require('mongoose');
    var DB_URL = "mongodb://localhost:27017/sz-gp-4";


    mongoose.connect(DB_URL, { useNewUrlParser: true,useUnifiedTopology: true  })

    mongoose.connection.on('connected',() => {
        console.log('db connect success')
    })

    mongoose.connection.on('disconnected',() => {
        console.log('db connect fail')
    })

    mongoose.connection.on('error',() => {
        console.log('db connect error')
   })
   ```

   app.js中注册路由
   ```js
  // restful api
   var bannerApi = require('./api/banner')

   //接口要想生效需要写在默认路由上面，注册接口
   app.use('/api/banner', bannerApi)
   ```
   ### 数据库的剧本操作

    1，连接数据库
    ```js
     var mongoose = require('mongoose');
    var DB_URL = "mongodb://localhost:27017/sz-gp-4";


    mongoose.connect(DB_URL, { useNewUrlParser: true,useUnifiedTopology: true  })

    mongoose.connection.on('connected',() => {
        console.log('db connect success')
    })

    mongoose.connection.on('disconnected',() => {
        console.log('db connect fail')
    })

    mongoose.connection.on('error',() => {
        console.log('db connect error')
    })

    module.exports = mongoose
   
    ```

    2,创建数据库的集合
    sql/modules/Banner.js
    ```js
    const mongoose = require('./../db')
    const Schema = mongoose.Schema

    //创建数据库的集合

    const schema = new Schema({
        bannerid:{
            type:String,
            required: true
        },
        bannerimg: {
            type:String,
            required: true
        },
        link:{
            type:String,
            required: true
        },
        alt:{
            type:String,
            required: true
        }
    })

    module.exports = mongoose.model('banner', schema) //会自动在数据库中创建一个集合为banners
    ```

    3 封装增删查改

    ```js
    const {Collection} = require('./db')

    module.exports = {
        insert (CollectionName, insertData) {
            return new Promise((resolve,reject) => {
                //node 中错误优先回掉原则
                CollectionName.insertMany(insertData, (err) => {
                    if (err) throw err;
                    resolve()
                })
            })
        },
        delete (CollectionName, whereData, deleteNum) {
            return new Promise(resolve => {
                const deleteType = deleteNum === 1 ? 'deleteMany' : 'deleteOne'
                CollectionName[deleteType](whereData, err => {
                    if (err) throw err;
                    resolve()
                })
            })
        },
        update (CollectionName,whereData,updateData) {
            const updateType = updateNum === 1 ? 'updateMany' : 'updateOne'
            return new Promise(resolve => {
                CollectionName[updateType](whereData, updateData, err => {
                    if (err) throw err;
                    resolve()
                })
            })
        },
        find (CollectionName, whereData, showData) {
            return new Promise(resolve => {
                CollectionName.find(whereData, showData).exec((err, data) => {
                    if (err) throw err;
                    resolve(data)
                })
            })
        },
        paging (CollectionName,whereData, showData, count, limitNum) {
            limitNum = limitNum || 10
            count = count || 1
            return new Promise(resolve => {
                //表示页码不是从0开始，从1开始
                CollectionName.find(whereData,showData).limit(limitNum).skip((count -1) * 
                limitNum).exec((err,data) => {
                    if (err) throw err
                    resolve(data)
                })
            })
        }
    }
    ```
    4,接口测试
    ```js
     router.get('/',(req,res,next) => {
     sql.find(Banner, {}, {}).then(data => {
        res.status('200').send(data)
     })
    })
    ```
    5，实现后段插入轮播图数据
    安装生成唯一字段的模块-- uuid 或者  short-uuid(推荐使用这个)

    6，查询轮播图接口

    7,删除数据

    8,语言包在入口加上这个
    ```js
    import { ConfigProvider } from 'antd';
    // 由于 antd 组件的默认文案是英文，所以需要修改为中文
    import zhCN from 'antd/lib/locale/zh_CN';
    ```

    9,表格的选择框，设置统一选中功能，批量删除选中的数据




    


    
    



    






   


          
 


