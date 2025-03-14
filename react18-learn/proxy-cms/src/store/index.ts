import { configureStore } from '@reduxjs/toolkit';
//redux数据持久化
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import UserReducer, { USER_FEATURE_KEY } from './slices/user.slice';
import CollapseReducer, { COLLAPSE_FATURE_KEY} from './slices/collapse.slice';
import CusolorReducer, { CUSCOLOR_FETURE_KEY } from './slices/colors.slice';
import UnreadNumReducer, { UNREADNUM_FETURE_KEY } from './slices/message.slice'
// import ProxyReducer, { PROXY_FETURE_KEY } from './slices/proxy.slice';
import AmountNumReducer, {AMOUNTNUM_FETURE_KEY} from './slices/proxy.slice';
import ChatPeopleReducer, { CHATPEOPLE_FETURE_KEY } from './slices/static.slice';


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['page404']
}

const persistCollapseReducer = persistReducer(persistConfig, CollapseReducer)
const persistUserReducer = persistReducer(persistConfig, UserReducer)
const persistCusolorReducer = persistReducer(persistConfig, CusolorReducer)
const persistUnreadNumReducer = persistReducer(persistConfig, UnreadNumReducer)
const persistProxyReducer = persistReducer(persistConfig, AmountNumReducer)
const persistStaticReducer = persistReducer(persistConfig, ChatPeopleReducer)


//创建，配置，导出store对象
const store = configureStore({
    //reducer选项用于替换原有的combineReducer方法，用于合并应用中的多个reducer函数，组成最终的store
    reducer: {
        [USER_FEATURE_KEY]: persistUserReducer,
        [COLLAPSE_FATURE_KEY]: persistCollapseReducer,
        [CUSCOLOR_FETURE_KEY]: persistCusolorReducer,
        [UNREADNUM_FETURE_KEY]: persistUnreadNumReducer,
        [AMOUNTNUM_FETURE_KEY]: persistProxyReducer,
        [CHATPEOPLE_FETURE_KEY]: persistStaticReducer,
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
// redux数据持久化
export const persistor = persistStore(store)

export default store;