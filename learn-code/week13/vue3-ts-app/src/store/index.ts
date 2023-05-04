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
    changeList ({ commit }: any, data: any) {
      commit('setList', data)
    },
    deleteItem ({ commit, state }: any, data: any) {
      state.list.splice(data, 1)
      commit('getList', state.list)
    }
  },
  mutations: {
    setList(state: any, data: any) {
      state.list.push(data)
    },
    getList(state: any, data: any) {
      state.list = data
    }
  }
})