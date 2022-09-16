// 引入redux
// 使用createStore(reducer)

import {combineReducers, createStore, applyMiddleware } from 'redux'
import CityReducer  from './reducers/cityReducer'
import TabBarReducer from './reducers/tabbarReducer'
import CinemaListReducer from './reducers/CinemaListReducer'
import reduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['CityReducer'] // 白名单代表想要持久化的模块
    // blacklist: ['CityReducer']  黑名单代表不需要持久化的模块
  }

const rootReducer = combineReducers({CityReducer, TabBarReducer, CinemaListReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(persistedReducer, applyMiddleware(reduxThunk));
const store = createStore(persistedReducer, applyMiddleware(reduxThunk));
const persistor = persistStore(store)

export {
    store, persistor
}

/**
 * store.dispatch
 * store.subscribe
 * store.getState
 */

//下边是自己封装的redux
// function createTestStore (reducer) {
//     var list = [];
//     var state = reducer();
//     function subscribe(callback) {
//         list.push(callback)
//     }
//     function dispatch(action) {
//         state = reducer(state,action)
//         for(var i in list) {
//             list[i] && list[i]()
//         }
//     }
//     function getState() {
//         return state
//     }
//     return {
//         subscribe,
//         dispatch,
//         getState
//     }
// }

/**
 * 纯函数：
 * 1，对外界没有副作用
 * 2，同样的输入得到同样的输出
 */


// export default store