import { resolve } from 'url'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { loginRequest } from './../api/login'
import { getItem, setItem } from './../util/common'

// 为 store state 声明类型
export interface State {
  count: number;
  list: string[];
  loginInfo: {
    token: String,
    username: String,
    role: String,
    loginState: Boolean
  }
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    list: ['aa', 'vv'],
    loginInfo: {
      token: getItem('token') || '',
      username: getItem('username') || '',
      role: getItem('role') || '0',
      loginState: Boolean(getItem('loginState')) || false
    }
  },
  actions: {
    changeList ({ commit }, data) {
      commit('setList', data)
    },
    deleteItem ({ commit, state }, data) {
      state.list.splice(data, 1)
      commit('getList', state.list)
    },
    loginNow ({ commit, state }, data) {
      return new Promise(resolve => {
        loginRequest().then((res: any) => {
          console.log(data)
          if(data.username === res['result']['test']['userName']) {
            setItem('token', res['result']['test']['token'])
            setItem('username', res['result']['test']['userName'])
            setItem('role', res['result']['test']['role'])
            setItem('loginState', res['result']['test']['loginState'])
            commit('saveLoginInfo', res['result']['test'])
          }
          resolve(res)
        })
      })
    }
  },
  mutations: {
    setList(state, data) {
      state.list.push(data)
    },
    getList(state, data) {
      state.list = data
    },
    saveLoginInfo(state, data) {
      state.loginInfo.token =  data.token
      state.loginInfo.username =  data.userName
      state.loginInfo.role =  data.role
      state.loginInfo.loginState = data.loginState
      console.log(state)
    }
  }
})