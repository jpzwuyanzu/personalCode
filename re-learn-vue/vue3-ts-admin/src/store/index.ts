import { createStore } from 'vuex'
import { AxiosResponse } from 'axios'
import request from './../utils/request'
import { getCookieItem, setCookieItem } from './../utils/common'

export default createStore({
    state: {
        counter: 0,
        isFload: false,
        username: getCookieItem('username') || '',
        role: getCookieItem('role') * 1 || 0,
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
        },
        changeLoginState(state, payload) {
            state.loginState = payload.loginState
        }
    },
    actions: {
        changeFloadStateAction({ commit }, payload) {
            commit('changeFloadState', payload)
        },
        saveUserInfoAction({ commit }, payload) {
            //在这里做登录操作,并且将用户信息返回回去
            return new Promise(async (resolve) => {
                const response: any = await request.get('/userInfo.json')
                setCookieItem('username', response.result[payload.username].username)
                setCookieItem('role', response.result[payload.username].role)
                setCookieItem('loginState', response.result[payload.username].loginState)
                setCookieItem('token', response.result[payload.username].token)
                commit('saveUserInfoState', {
                    username: response.result[payload.username].username,
                    role: response.result[payload.username].role,
                    loginState: response.result[payload.username].loginState,
                    token: response.result[payload.username].token
                })
                resolve(response)
            })

        },
        changeLoginStateAction({ commit }, payload) {
            commit('changeLoginState', payload)
        }
    }
})
