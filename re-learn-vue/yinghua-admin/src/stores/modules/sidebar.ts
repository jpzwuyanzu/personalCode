import { SWITCHFLOD } from '../mutation-types'
const sideModule = {
    namespaced: true,
    state() {
        return {
            flodState: true // 是否折叠左侧菜单
        }
    },
    getters: {
        getFlodState(state: { flodState: Boolean }, getters: any, rootState: any, rootGetters: any) {
            return state.flodState
        }
    },
    mutations: {
        switchflod: (state: { flodState: Boolean }, payload: any) => {
            state.flodState = !state.flodState
        }
    }
}

export default sideModule