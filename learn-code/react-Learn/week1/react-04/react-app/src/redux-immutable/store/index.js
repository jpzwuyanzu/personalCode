// import { createStore, applyMiddleware, combineReducers } from 'redux'
// 使用了immutable的数据结构之后，使用redux-immutable提供的combineReducers方法替换redux里的combineReducers
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'

import thunk from 'redux-thunk'


import homeReducer from './reducers/home'

import kindReducer from './reducers/kind'

const reducer = combineReducers({
    home:homeReducer,
    kind:kindReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store