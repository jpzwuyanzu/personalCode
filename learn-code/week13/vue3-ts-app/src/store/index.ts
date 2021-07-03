import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// 为 store state 声明类型
export interface State {
  count: number;
  list: string[]
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    list: ['aa', 'vv']
  },
  actions: {
    changeList ({ commit }, data) {
      commit('setList', data)
    },
    deleteItem ({ commit, state }, data) {
      state.list.splice(data, 1)
      commit('getList', state.list)
    }
  },
  mutations: {
    setList(state, data) {
      state.list.push(data)
    },
    getList(state, data) {
      state.list = data
    }
  }
})