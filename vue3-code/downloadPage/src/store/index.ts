import { createStore } from 'vuex'

export default createStore({
    state: {
        swiperIndex: 0
    },
    mutations: {
        changeSwiperIndex(state, payload) {
            state.swiperIndex = payload.swiperIndex;
        }
    },
    actions: {
        changeSwiperIndexAction({ commit }, payload) {
            commit('changeSwiperIndex', payload)
        }
    }
})
