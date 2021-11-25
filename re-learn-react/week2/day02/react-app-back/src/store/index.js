import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux-immutable'
import thunk from 'redux-thunk'
import homeReducer from './reducers/home'
import kindReducer from './reducers/kind'
import proReducer from './reducers/pro'

const store = createStore(combineReducers({
    home: homeReducer,
    kind: kindReducer,
    pro: proReducer
}), applyMiddleware(thunk))

export default store