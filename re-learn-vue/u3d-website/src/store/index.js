import { createStore } from 'vuex'
import verifyCode from './modules/verifyCode'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
    modules: {
        verifyCode
    },
    plugins: [
        createPersistedstate({
            key: 'u3d-website',
            paths: ['verifyCode'] // 需要持久化的模块
        })
    ]
})