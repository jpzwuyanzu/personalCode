import { configureStore } from '@reduxjs/toolkit'
import TabBarReducer from './tabbar.slice';
import SHOW_TAB_KEY from './tabbar.slice'

//配置redux数据持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage,
    blcklist: ['NotFound']
}
const persistTabBarReducer = persistReducer(persistConfig, TabBarReducer);

//配置store
const store = configureStore({
    reducer: {
        SHOW_TAB_KEY : persistTabBarReducer
    },
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


