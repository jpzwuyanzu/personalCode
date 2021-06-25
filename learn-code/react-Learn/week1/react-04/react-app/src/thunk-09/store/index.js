import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

//异步处理一定要用中间件
const middleware = applyMiddleware(thunk)

const store = createStore(reducer,middleware)

export default store