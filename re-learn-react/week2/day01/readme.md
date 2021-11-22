# 1，单独使用redux 

1, 引入redux store.js

```js
import { createStore } from 'redux'

/**
 * createStore（）中主要有哪些方法
 * 
 * 如果需要获取状态 store.getState()
 * 
 * 如果需要订阅更新视图 store.subscribe(Fn) Fn是关键,（状态或者是属性的改变会引起视图的二次渲染 --- 入口文件）
 * 
 * 如果需要触发更改状态， store。dispatch({ type: '' })
 */
```

2,创建reducer  reducer.js  --数据的改变必须由纯函数修改

```js
const defaultState = {
    count: 0
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return Object.assign({}, state, { count: state.count - 1 })
        default:
            return state
    }
}
export default reducer
```

3， 创建store
```js
import { createStore } from 'redux'

import reducer from './reducer'

const store = createStore(reducer)


export default store
```

4, 入口文件index.js 订阅变化

```js
import React from 'react'
import ReactDOM from 'react-dom'
import store from './03redux/store'
import App from './03redux/App'
function render() {
    ReactDOM.render(
        <App></App>,
        document.getElementById('root')
    )
}
render()
// 如果状态一旦发生改变，就重新执行render函数（自定义函数）
store.subscribe(render)
```
5,组件处使用状态管理器 App.jsx
```jsx
import React, { Component } from 'react'
import Child from './Child'
import store from './store'

export default class App extends Component {
    render() {
        return (
            <div>
               <button onClick = { () => {
                   store.dispatch({ type: 'DECREMENT' })
               } }>-</button>
               { store.getState().count }
               <button onClick = { () => {
                   store.dispatch({ type: 'INCREMENT' })
               } }>+</button>
               <Child></Child>
            </div>
            
        )
    }
}
```


# 2， 使用redux + react-reduxs

react-redux 把组件划分为容器组件和展示组件（ui组件）

1，入口文件 index.js
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './04todolist/TodoList'
import { Provider } from 'react-redux' //在顶级组件中使用
import store from './04todolist/store'


ReactDOM.render(
    <Provider store = { store }>
     <App></App>
    </Provider>,
    document.getElementById('root')
)
```

2， 创建reducer /store/reducer.js
```js
const defaultState = {
    list: ['task1', 'task2', 'task3']
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // 对象合并， 合并list（数组）
            return { ...state, list: [...state.list, action.payload] }
        case 'REMOVE_ITEM': 
          const arr =   state.list.filter((item, index) => {
                return index !== action.payload
            })
            return  { ...state, list: arr }
        default:
            return state
    }
}

export default  reducer
```
3, 创建store /store/index.js

```js
import { createStore } from 'redux'
import reducer from './reducer'

export default createStore(reducer)
```
4, 表单组件添加数据 Form.jsx

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'

 class Form extends Component {
    state = {
        keyword: ''
    }
    handlerChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }
    handlerKeyUp = (e) => {
        if(e.keyCode === 13) {
            console.log('21')
            this.props.addItem(this.state.keyword)
            this.setState({ keyword: '' })
        }
    }
    render() {
        return (
            <input type="text" 
            value = { this.state.keyword }
            onChange = { this.handlerChange }
            onKeyUp = { this.handlerKeyUp }
             />
        )
    }
}
const mapDispatchToProps = (dispatch) => { // dispatch是该函数的默认参数
    return {
        addItem (payload) { //可以在组件中通过this.props.addItem(params)调用
            dispatch({ 
                type: 'ADD_ITEM', 
                payload 
            })
        }
    }
}

//如果不需要获取状态第一个参数可以为null
export default connect(null, mapDispatchToProps)(Form)
```

5， 便利数据以及删除数据 List.jsx

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'

 class List extends Component {
    removeData = (index) => {
        return () => {
            this.props.removeItem(index)
        }
    }
    render() {
        return (
            <ul>
                {
                    this.props.list.map ((item, index) => {
                     return   <li key = { index }>
                      { item }
                     <button onClick = { this.removeData(index) }>删除</button>
                     </li>
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => { //state是全局的状态状态数据
    return { 
        list: state.list  //在组件中通过this.props.list获取到数据
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem (index) {
            dispatch({
                type: 'REMOVE_ITEM',
                payload: index
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)


```

6, 可以使用装饰器语法

7， 为什么一开始可以拿到初始化的数据

观测redux源码， 得知， 会自动调用一次dispatch 
```js
// When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT })
```