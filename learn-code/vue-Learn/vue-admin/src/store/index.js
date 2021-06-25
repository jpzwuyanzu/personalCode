import Vue from 'vue'
import Vuex from 'vuex'
import util from './../util/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0,
    userInfo:{
      userName:util.getStorage('session', 'userName') ? JSON.parse(util.getStorage('session', 'userName')) : '',
      role:util.getStorage('session', 'role') ? JSON.parse(util.getStorage('session', 'role'))*1 : 0,
      loginState:util.getStorage('session', 'loginState') ? JSON.parse(util.getStorage('session', 'loginState')) : false
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    saveUserInfo(state,payload) {
      state.userInfo = {...payload}
    }
  },
  actions: {
    increment(context){
      context.commit('increment')
    },
    loginNow(context, payload) {
      return new Promise(resolve => {
        fetch('/userInfo.json').then(res => res.json()).then(result => {
          let params = {
            userName: result.result[payload]['userName'],
            role: result.result[payload]['role'],
            loginState: result.result[payload]['loginState']
          }
          context.commit('saveUserInfo',params)
          resolve(result.result[payload])
      })
      })
    }
  }
})
