import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'

// 当使用了immutable的时候，combineReducers需要从redux-immutable中导入
// 否则从redux中导入


import thunk from 'redux-thunk'

import homeReducer from './redcers/home'
import kindReducer from './redcers/kind'

const reducer = combineReducers({
    home: homeReducer,
    kind: kindReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store