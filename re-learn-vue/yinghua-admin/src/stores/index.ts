import { createStore } from 'vuex'
import user from './modules/user'
import createPersistedstate from 'vuex-persistedstate'

console.log('9090909')
export default createStore({
    modules: {
        user
    },
    plugins: [
        createPersistedstate({
            key: 'yinhua-admin-soore',
            paths: ['user'] // 需要持久化的模块
        })
    ]
})