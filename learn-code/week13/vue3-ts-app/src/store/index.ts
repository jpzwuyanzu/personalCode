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
    changeList ({ commit, state }, data) {
      commit('setList', data)
    }
  },
  mutations: {
    setList(state, data) {
      state.list.push(data)
    }
  }
})