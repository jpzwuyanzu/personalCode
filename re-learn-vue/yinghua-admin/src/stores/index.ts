import { createStore } from 'vuex'
import user from './modules/user'
import sidebar from './modules/sidebar'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
    modules: {
        user,
        sidebar
    },
    plugins: [
        createPersistedstate({
            key: 'yinhua-admin-soore',
            paths: ['user','sidebar'] // 需要持久化的模块
        })
    ]
})