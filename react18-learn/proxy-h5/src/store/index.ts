import { configureStore, combineReducers } from '@reduxjs/toolkit'
import TabBarReducer from './tabbar.slice';
import {SHOW_TAB_KEY} from './tabbar.slice'
import SelectCityReducer from './selectcity.slice';
import {SELECT_CITY_KEY} from './selectcity.slice'

//配置redux数据持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    [SHOW_TAB_KEY] : TabBarReducer,
    [SELECT_CITY_KEY] : SelectCityReducer
})
const persistConfig = {
    key: 'root',
    storage,
    blcklist: ['NotFound']
}
const persistedReducer = persistReducer(persistConfig, reducers);

//配置store
const store = configureStore({
    reducer: persistedReducer,
    // 配置中间件
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false })
    ]
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default store;


