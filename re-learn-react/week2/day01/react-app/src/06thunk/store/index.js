import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'

import thunk from 'redux-thunk'
import m1 from './middleware/m1'


const middleware = applyMiddleware(thunk,m1)

//middleware实际上是第三个参数， 源码中会有判断处理

// 当异步操作在actionCreator中，必须使用中间件
const store = createStore(reducer, middleware) 

export default store