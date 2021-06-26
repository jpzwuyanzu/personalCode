import { createStore } from 'vuex'
export default createStore({
    state: {
        listData: {1:10},
        num: 10
    },
    mutations: {
        setData (state, payload) {
            state.listData = payload
        },
        addNum (state) {
            state.num = state.num + 10
        }
    },
    actions: {
        setData (contex, payload) {
            contex.commit('setData', payload)
        }
    },
    modules: {}
})
