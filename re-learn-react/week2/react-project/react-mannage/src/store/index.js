import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'

import thunk from 'redux-thunk'
import commonReducer from './modules/common'


const reducer = combineReducers({
    common: commonReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store

