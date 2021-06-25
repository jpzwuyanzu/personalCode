# Portal


# 装饰器语法

# Flux 

# 状态管理器

# Redux
# 单纯使用redux
# 使用状态管理步骤
## 1，  引入redux
/**
 * 
 * 如果需要获取状态  store.getState()
 * 如果需要订阅更新视图  store.subscribe(fn)  fn是关键  (状态/属性的改变会导致视图的二次渲染 ---- 入口文件)
 * 如果需要触发更改状态 this.$store.dispatch({type:''});
 * 
 */

## 2， 创建reducer -- 数据的改变必须经过纯函数修改
```js
    const defaulState = {
        count : 0
    }
    const reducer = (state = defaulState, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return  { ...state, count: state.count + 1 }
            
                case 'DECREMENT':
                return  Object.assign({}, state, { count: state.count - 1 })
            default:
                return state
        }
    }

    export default reducer
```


## 3创建store
```js
import { createStore } from 'redux'


import reducer from './reducer'

const store = createStore(reducer)

export default store
```


## 4入口文件处订阅变化
```js
import React from 'react';
import ReactDOm from 'react-dom';
import App from './redux-03/App'
import store from './redux-03/store'
function render() {
    ReactDOm.render(
        <React.StrictMode>
            <App/>
    </React.StrictMode>,
    document.getElementById('root')
    )
}
render()
//如果状态一旦发生改变，就会重新执行render函数（自定义的函数）
store.subscribe(render)
```

## 5组件处使用状态管理器
```js
import React, { Component } from 'react';
import store from './store';
import Child from './Child'
class App extends Component {
    render() {
        return (
            <div>
                <button onClick={ () => {
                    // 修改状态
                    store.dispatch({type:'DECREMENT'})
                }  }>-</button>
                { store.getState().count }
                <button onClick={ () => {
                    store.dispatch({type:'INCREMENT'})
                }  }>+</button>
                <hr/>
                <Child/>
            </div>
        );
    }
}

export default App;
```

# redux + react-redux

react-redux（里边提供的Provider）---把组件容器组件和展示组件（ui组件）

1. 入口文件
```js
import React from 'react';
import ReactDOM from 'react-dom';
import ToDoList from './todolist/TodoList'
import  { Provider } from 'react-redux' //在顶级组件中使用provider
import store from './todolist/store'

     ReactDOM.render(
        <Provider store = { store }>
            <ToDoList/>
        </Provider>,
        document.getElementById('root')
    )
```
 2. 创建reducer
```js
const defaultState = {
    list: ['task1', 'task2', 'task3']
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            //对象合并， 合并list
        return { ...state, list: [...state.list, action.data] }
        case 'REMOVE_ITEM':
            //对象合并， 合并list
            // state.list.splice(action.index, 1)
           const arr =  state.list.filter((item,index) => {
                return index !== action.index
            })
            return { ...state, list: arr }
    
        default:
            return state
    }
}
export default reducer
```

3. 创建store
```js
import { createStore } from 'redux'

import reducer from './reducer'



export default createStore(reducer)

```
4. 表单添加数据
```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
    state = {
        keyword:''
    }
    handlerChange = (e) => {
        this.setState({ keyword: e.target.value })
    }
    handlerKeyUp = (e) => {
        if(e.keyCode === 13) {
            this.props.addItem(this.state.keyword)
            this.setState({keyword:''})
        }
    }
    render() {
        return (
                <input 
                type="text"
                value = { this.state.keyword }
                onChange = { this.handlerChange }
                onKeyUp = { this.handlerKeyUp }
                />
        );
    }
}

//为了把业务逻辑传入到展示组件中
const mapDispatchToProps = (dispatch) => { //dispatch是该函数的默认参数
    return {
        addItem(data) { //可以在组件中通过this.props.addItem(params)调用
            dispatch({
                type:'ADD_ITEM',
                data
            })
        }
    }
}

//如果不需要获取状态，另一个参数为null

export default connect(null, mapDispatchToProps)(Form);

```

5. 遍历数据删除数据
```js
import React, { Component } from 'react';
import { connect } from 'react-redux'

class List extends Component {
    handlerDelete = (index) => {
       return () => {
        this.props.removeItem(index)
       }
    }
    render() {
        return (
            <ul>
                { this.props.list.map((item,index) => {
                 return   <li key={ index }>{ item } <button onClick={ this.handlerDelete(index) }>删除</button></li>
                }) }
            </ul>
        );
    }
}


const mapStateToProps = (state) => { //state参数为全局state
    return { list :  state.list} //通过this.props.list获取数据
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem(index) {
            dispatch({type:'REMOVE_ITEM',index})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(List);

```
6. 可以使用装饰器语法

7. 为什么一开始可以拿到初始化数据
观测redux源代码，自动调用一次dispatch
```js
dispatch({type:ActionTypes.INIT})
```

# react + readux + react-redux + redux-thunk





# useEffect钩子

 1， useEffect(() => {}) 如果只传递一个函数作为参数会在组件初次加载以及后边每次重新渲染都会执行 
     相当于componentDidMount和componentDidUpdate周期

 2， useEffect(() => {}, []) 如果传递一个函数和一个空数组，表示一个不依赖任何依赖项的副作用，
    只会在组件挂载的时候执行一次相当于componentDidMount周期函数

 3，useEffect(() => {}, [props.name]) 如果传递一个函数和一个非空数组，表示当前副作用依赖于后边的依赖项 
    只有依赖项发生改变才会执行 相当于componentDidUpdate周期

 4，useEffect(()=>{},[props.name],return() => {}) 如果return一个函数则代表组件卸载的时候需要清理副作用componentDidUnmount周期

# useCallback钩子
 
 1，当父组件通过属性向子组件传递函数的时候，一旦父组件重新渲染，就会导致子组件也会重新渲染，此时使用useCallback钩子函数将需要要传递的函数缓存，
    同时如果子组件是类组件的时候使用purComponnet 如果是函数式组件使用memo包裹
    useCallback(() => {处理函数}, [])

# useMemo钩子

 1，当父组件通过属性向子组件传递属性参数的时候，一旦父组件渲染子组件也会渲染，需要使用useMemo钩子对需要传递的属性进行缓存，这样可以优化，
    同时如果子组件是类组件的时候使用purComponnet 如果是函数式组件使用memo包裹， 类似于vue的计算属性
    useMemo(() => {}, [])
# useRef钩子与ref

  useRef钩子创建一个引用，类似与类组件中的this，将需要保存的变量赋值给.current属性，即使组件重新render之后也不会重新创建，

  ref 通过creatRef()创建一个引用莱保存jsx中具体元素的引用，但是每次重新render都会重新创建

# useRef跟useState对比
使用useRef()
function timer() {
    const intervalRef = useref()
    useEffect(() => {
        const id = setInterval(() => {
            //...
        })
        intervalRef.current = id
        return () => {
            clearInterval(intervalRef.current)
        }
    })
    // ...
}

使用useState()
function timer() {
    const [intervalId, setIntervalId] = useState(null)
    useEffect(() => {
        const id = setInterval(() => {
            //...
        })
        setIntervalId(id)
        return () => {
            clearInterval(intervalId)
        }
    })
    // ...
}

 useState会导致重新渲染， useRef不会导致重新渲染
 共同点： 都可以在重新渲染之后记住数据，如果变量是决定视图图层渲染的变量，使用useState， 否则使用useRef





