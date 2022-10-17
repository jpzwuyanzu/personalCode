import { configureStore } from '@reduxjs/toolkit'
// configureStore: 用于创建，配置store对象的方法
import CollapseReducer from './slices/collapse.slice'
// 导入CollapseReducer， 用于配置store对象

// 创建，配置，导出store对象
const store = configureStore({
    // reducer选项用于替换原有的combineReducer方法
    // 用于合并应用中的多个reducer函数，组成最终的store对象
    reducer: {
        collapse: CollapseReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;