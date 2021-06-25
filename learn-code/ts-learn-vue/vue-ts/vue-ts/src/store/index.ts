import Vue from 'vue'
import Vuex from 'vuex'
import { AxiosResponse } from 'axios'
import { getItem } from './../utils/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: getItem('username') || '',
    age: getItem('age') || 0,
    loginState: getItem('loginState') || false,
    token: getItem('token') || '',
    proList: []
  },
  mutations: {
    changeProlist (state, payload) {
      state.proList = payload
      // console.log(payload)
    },
    changeUserInfo (state, payload) {
      state.username = payload.name
      state.age = payload.age
      state.loginState = true
      state.token = payload.token
    },
    loginOut (state) {
      state.loginState = false
    }
  },
  actions: {
    changeProlistAction ({ commit }, payload) {
      // console.log(payload)
      window.axios({
        url: '/pro.json',
        params: payload, // get  params    ====   post data
        method: 'GET'
      }).then((res: AxiosResponse) => {
        // console.log(res)
        commit('changeProlist', res.data.result)
      })
    },
    changeUserInfoAction ({ commit }, payload) {
      console.log(payload)
      return new Promise(resolve => {
        window.axios({
          url: '/user.json',
          params: '',
          method: 'GET'
        }).then((res: AxiosResponse) => {
          // console.log(res)
          commit('changeUserInfo', res.data.result[payload.username])
          resolve(res.data.result[payload.username])
        })
      })
    },
    loginOutAction ({ commit }) {
      commit('loginOut')
    }
  },
  modules: {
  }
})
