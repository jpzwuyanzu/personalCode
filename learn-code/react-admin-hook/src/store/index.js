import {createStore, applyMiddleware} from 'redux'
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk'
import commonReducer from './modules/common'
import userReducer from './modules/user'

const reducer = combineReducers({
    common: commonReducer,
    user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store


