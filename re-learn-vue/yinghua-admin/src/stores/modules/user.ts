import { INCREASE, SAVEUSERINFO } from '@/stores/mutation-types'
import request from '@/utils/request'
import { message } from 'ant-design-vue'
import type { IUserInfo } from '@/types/interface'
const userModule = {
    namespaced: true, //所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
    state() {
        return {
            userCounter: 1000,
            username: '',
            loginState: false,
            token:''
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
        SAVEUSERINFO: (state: any, payload:any) => {
            state.username = payload.username;
            state.loginState = payload.loginState;
            state.token = payload.token;
        } 
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
        },
        saveUserInfoAction({ commit }: any, payload: IUserInfo) {
            //在这里做登录操作，并将信息返回出去
            return new Promise(async(resolve) => {
                const resp = await fetch('userInfo.json').then(res => res.json());
                console.log(resp)
                if(resp.code === 200) {
                    //在这里存储用户信息
                    commit('SAVEUSERINFO', {
                        username: resp.result?.[String(payload.username)].username,
                        loginState: resp.result?.[String(payload.username)].loginState,
                        token: resp.result?.[String(payload.username)].token,
                    })
                    message.success('登录成功')
                } else {
                    message.success('用户名或帐号错误')
                }
                resolve(resp)
            })
        }
    }
}

export default userModule