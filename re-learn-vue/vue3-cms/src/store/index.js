import { createStore } from 'vuex'
import request from './../utils/request'
import { getCookieItem, setCookieItem } from './../utils/common'

export default createStore({
    state: {
        counter: 0,
        isFload: false,
        username: getCookieItem('username') || '',
        role: getCookieItem('role')*1 || 0,
        loginState: getCookieItem('loginState') || false,
        token: getCookieItem('token') || ''
    },
    mutations: {
        changeFloadState(state, payload) {
            state.isFload = payload
        },
        saveUserInfoState(state, payload) {
            state.username = payload.username
            state.role = payload.role
            state.loginState = payload.loginState
            state.token = payload.token
        }
    },
    actions: {
        changeFloadStateAction({ commit }, payload) {
            commit('changeFloadState', payload)
        },
        saveUserInfoAction({ commit }, payload) {
            //在这里做登录操作,并且将用户信息返回回去
            return new Promise((resolve) => {
                request.get('/userInfo.json').then(res => {
                    console.log(res)
                    console.log(payload)
                    //保存数据到cookie中
                    setCookieItem('username', res.result[payload.username].username)
                    setCookieItem('role', res.result[payload.username].role)
                    setCookieItem('loginState', res.result[payload.username].loginState)
                    setCookieItem('token', res.result[payload.username].token)
                    commit('saveUserInfoState', {
                        username: res.result[payload.username].username,
                        role: res.result[payload.username].role,
                        loginState: res.result[payload.username].loginState,
                        token: res.result[payload.username].token
                    })
                    //将结果返回到ui组件
                    resolve(res)
                })
            })

        }
    }
})
