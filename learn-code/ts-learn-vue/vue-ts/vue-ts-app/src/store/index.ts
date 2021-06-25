import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prolist: []
  },
  mutations: {
    changeProlist (state, payload) {
      state.prolist = payload
    }
  },
  actions: {
    getProlistAction ({ commit }, payload) {
      console.log(payload)
      axios.get('/imgList.json').then(res => {
        commit('changeProlist', res.data.result)
      })
    }
  },
  modules: {
  }
})
