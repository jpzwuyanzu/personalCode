import { INCREASE } from '@/stores/mutation-types'
const userModule = {
    namespaced: true, //所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
    state() {
        return {
            userCounter: 1000
        }
    },
    getters: {
        // 访问: $store.getters['user/getInfo']，这里的user是指被导入的时候，modules中的命名
        // 四个参数如下
        getInfo(state: { userCounter: any; }, getters: any, rootState: any, rootGetters: any) {
            return `userCounter:${state.userCounter}`;
        }
    },
    mutations: {
        // 调用：$store.commit('user/increase')
        // 第一个参数是模块的局部状态对象state
        INCREASE: (state: { userCounter: number; }, payload: any) =>  {
            state.userCounter += payload;
        },
    },
    actions: {
        // 调用$store.dispatch('user/increaseAction')
        // 6个参数如下
        increaseAction({ commit, dispatch, state, rootState, getters, rootGetters }: any, payload: any) {
            console.log('90909')
            // setTimeout(() => {
                commit(INCREASE, payload)
            // }, 1000);
        },
        // 子module中调用根module中的方法
        fIncrease({ commit, dispatch, state, rootState, getters, rootGetters }: any) {
            commit(INCREASE, null, { root: true });
            // 或
            // dispatch('increaseAction', null, { root: true });
        }
    }
}

export default userModule