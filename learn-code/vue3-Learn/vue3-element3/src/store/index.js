import { createStore } from 'vuex'
import { getItem, setItem } from './../utils/common'
import request from './../utils/request'

export default createStore({
    state: {
        count: 0,
        isFload: false,
        userName: getItem('userName') ||  '',
        role: getItem('role')*1 || 0,
        loginState: getItem('loginState') || false,
        token: getItem('token') || ''
    },
    mutations: {
        changeFloadState(state, payload) {
            state.isFload = payload
        },
        saveUserInfoState(state, payload) {
          state.userName = payload.userName
          state.role = payload.role
          state.loginState = payload.loginState
          state.token = payload.token
        //   console.log(state)
        },
        loginOutState(state, payload) {
            state.loginState = false
            state.token = ''
        }
    },
    actions: { 
        changeFloadStateAction({ commit }, payload) {
            commit('changeFloadState', payload)
      },
      saveUserInfoStateAction( { commit }, payload ) {
          //在这里做登录操作，并且commit mutaition
            return new Promise(resolve => {
                request.get('/userInfo.json').then(res => {
                 //保存一份数据到cookie中
                //  console.log(payload)
                 setItem('userName', res.result[payload.userName.value].userName)
                 setItem('role', res.result[payload.userName.value].role)
                 setItem('loginState', res.result[payload.userName.value].loginState)
                 setItem('token', res.result[payload.userName.value].token)
                 commit('saveUserInfoState', {
                    userName: res.result[payload.userName.value].userName,
                    role: res.result[payload.userName.value].role,
                    loginState: res.result[payload.userName.value].loginState,
                    token: res.result[payload.userName.value].token
                 })
                 //返回请求的结果到ui组件中
                 resolve(res)
                })
            })
      },
      loginOutStateAction({ commit }, payload) {
          commit('loginOutState', {})
      }
   }
})