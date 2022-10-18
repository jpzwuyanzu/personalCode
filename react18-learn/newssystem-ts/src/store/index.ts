// configureStore: 用于创建，配置store对象的方法
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// 导入CollapseReducer， 用于配置store对象
import CollapseReducer from './slices/collapse.slice'
// 定义状态名称常量
import { COLLAPSE_FEATURE_KEY } from './slices/collapse.slice'

// redux数据持久化
import storage from 'redux-persist/lib/storage'
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    blcklist: ['page404']
}
const persistCollapseReducer = persistReducer(persistConfig, CollapseReducer)

// 创建，配置，导出store对象
const store = configureStore({
    // reducer选项用于替换原有的combineReducer方法
    // 用于合并应用中的多个reducer函数，组成最终的store对象
    reducer: {
        [COLLAPSE_FEATURE_KEY]: persistCollapseReducer
    },
    // 配置中间件
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// redux数据持久化
export const persistor = persistStore(store)
export default store;