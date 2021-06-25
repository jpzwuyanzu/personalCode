import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'

import thunk from 'redux-thunk'


const middleware = applyMiddleware(thunk) //使用中间件--异步操作卸载actionCreator中必须使用中间件

const store  = createStore(reducer, middleware) //第二个参数原本是修改状态的， middleware 是第三个参数，可以通过阅读源码得知

export default store