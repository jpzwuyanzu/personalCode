import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
    state: {
        count: 0,
        message: ''
    },
    mutations: {
        increment (state) {
            state.count++ 
        },
        upDateMessage(state, payload) {
            state.message = payload.message
        }
    },
    actions: {
        // increment(context) {
        //     context.commit('increment')
        // }
        increment({ commit }) {
            commit('increment')
        }
    }
})