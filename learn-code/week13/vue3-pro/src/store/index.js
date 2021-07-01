import { createStore } from 'vuex'
import pro from './modules/pro'

export default createStore({
  state: {
    num: 100
  },
  mutations: {
    changeA (state, data) {
      state.num = 10000
      console.log(state)
    }
  },
  actions: {
    getA ({ commit }) {
      commit('changeA')
    }
  },
  modules: {
    pro
  }
})
