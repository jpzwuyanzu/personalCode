### 1 如果项目使用装饰器

* 1，没有抽离配置文件

 + 安装依赖
 ```
 npm install @babel/plugin-proposal-decorators  customize-cra  react-app-rewired -D
 ```

+ 根目录下创建config-overrides.js文件

 ```js
 const {override, addDecoratorsLegacy} = require("customize-cra")
 module.exports = override(
     addDecoratorsLegacy(), //配置装饰器模式
 )
 ```

+ 修改package.json 运行命令
    ```json
    "scripts": {
    "start": "react-app-rewired start",  //update
    "build": "react-app-rewired build", //update
    "test": "react-app-rewired test",  //update
    "eject": "react-scripts eject"
  }
    ```



* 2，抽离配置文件
+ 安装依赖
```
npm run eject

npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D

npm i mobx mobx-react -S 这个代表安装最新版本

```

+ 修改package.json中babel的配置
```json
"babel": {
    "presets": [
        "react-app"
    ],
    "plugins": [
      [
          "@babel/plugin-proposal-decorators",
          {
              "legacy": true
          }
      ],
      [
          "@babel/plugin-proposal-class-properties",
          {
              "loose": true
          }
      ]
  ]
}
```

+ vscode中js文件使用装饰器会报红， 在项目根目录编写jsconfig.json
```json
{
    "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "experimentalDecorators": true
},
"include": ["src/**/*"]
}
```


### 2 使用mobx

## 改造使用装饰器语法

## 安装mobx

npm install mobx@5 mobx-react@6 -S

或者 yarn add mobx@5 mobx-react@6

### 2.1 创建状态管理器 index.js
```js
import HomeStore from './home'
class Store {
    constructor() {
        //分模块
        // new 实例时传入this，--- 方便魔魁之间彼此调用，这里的this指的是总的模块
        this.home = new HomeStore(this)
    }
}

const store = new Store()

export default store
```
### 2.2 创建分模块状态管理器 home.js
```js
import { observable, action } from 'mobx'
import request from './../utils/request'
class HomeStore {

    constructor(store) {
        this.store = store // store代表总状态管理器
        this.getProlist = this.getProlist.bind(this) //this的指向
    }

    //初始化数据
    @observable prolist = []

    //修改状态
    @action
    getProlist () {
        request('/pro.json').then(res => {
            console.log(res.data.result)
            this.prolist = res.data.result
        })
    }
}

export default HomeStore
```

### 2.3 入口文件处使用store
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import store from './store/index'


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store} >
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

### 2.4 组件处使用状态管理器 App.js
```js
import React from 'react'
import { observer, inject } from 'mobx-react'
// @inject('store')  将store绑定到this.props上
@inject('store')
@observer
class App extends React.Component {

  componentDidMount() {
    const { getProlist } = this.props.store.home
    getProlist()
  }

  render () {
    console.log('-=-=-=-=-=')
    console.log(this.props.store.home.prolist)
    console.log('-=-=-=-=-=')
    //  Proxy数组 arr.slice()可以转变成真正的数组·  
    // Proxy可以通过*.prop提取属性
    return (
      <>
        <h2>mobx</h2>
        {
          this.props.store.home.prolist.map((item,index) => {
            return (
              <div key={index}>{item.categoryname}</div>
            )
          })
        }
      </>
    )
  }
}

export default App
```

#### 在函数式组件中使用mobx
```js
import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

function App (props) {
  console.log(props)
  useEffect(() => {
    props.store.home.getProlist()
  }, [props.store.home])
  return (
    <>
      {
        props.store.home.prolist.map((item ,index) => {
         return   <div key={index}> { item.categoryname}</div>
        }) 
      }
    </>
  )
}

export default inject('store')(observer(App))
```
### 2.6 计算属性
```js
//计算属性
    @computed get prolen () {
        return this.prolist.length
    }

    { props.store.home.prolen }

```

