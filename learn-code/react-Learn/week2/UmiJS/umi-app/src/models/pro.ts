import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getProlist} from './../api/pro'

export interface IPro {
    proname: string,
    id: string
}

export interface IProModelState {
    name: string;
    prolist: Array<IPro>
  }

export interface IProModelType {
    namespace: string
    state: IProModelState;
    effects: Effect;
    reducers: {
        changeProlist: Reducer<IProModelState>
    }
    subscriptions: { setup: Subscription }
}

const proModel: IProModelType = {
    namespace: 'pro', //命名空间，如果不设置，会默认把文件名称作为命名空间
    state: { // 初始化状态
        prolist: [],
        name: ''
    },
    effects: { //类似于vue中的 actions，但是并不是完全一样的
       * getProlistFn({ payload }: any, { call, put  }: any): any {
        // 异步操作，通过call方法调用异步操作，通过put告诉reducer修改状态
        console.log('22222')
        const res = yield call(getProlist)
        console.log('4444444', res)
        yield put({
            type: 'changeProlist',
            payload: res.data
        })
       } 
    },
    reducers: { //类似与vuex中的mutations
        changeProlist(state: IProModelState, action: any) {
            console.log('3333333')
          return {
            ...state,
            prolist: action.payload,
          }
        }
    },
    subscriptions: { //subscriptions是参考了Redux-Router
        setup({ dispatch, history }: any) {
            console.log('11111')
          return history.listen(({ pathname }: any) => {
            if (pathname === '/pro/list') {
              dispatch({
                type: 'getProlistFn',
              });
            }
          });
        },
    },
}

export default proModel