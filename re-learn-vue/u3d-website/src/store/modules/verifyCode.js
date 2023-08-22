const verifyCode = {
    namespaced: true,
    state() {
        return {
            open: true
        }
    },
    getters: {
        getVerifyStatus(state, getters, rootState, rootGetters) {
            return state.open
        }
    },
    mutations: {
        switchverifyStatus: (state, payload) => {
            state.open = !state.open
        }
    }
}

export default verifyCode