import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getProlist } from '@/api/pro'

export interface IPro {
    proname: string
    id: string
}

export interface IProModelState {
    name: string
    prolist: Array<IPro>
}

export interface IProModeltype {
    namespace: string
    state: IProModelState
    effects: {
        getProlistFn: any
    } 
    reducers: {
        changeProlist: Reducer
    }
    subscriptions: { setup: Subscription }
}

const proModel: IProModeltype =  {
    namespace: 'pro',
    state: {
        prolist: [],
        name: ''
    },
    effects: {
        *getProlistFn({ payload }: any, { call, put  }: any): any {
        // 异步操作，通过call方法调用异步操作，通过put告诉reducer修改状态
        // console.log('22222')
        const res = yield call(getProlist)
        // console.log('4444444', res)
        yield put({
            type: 'changeProlist',
            payload: res.data
        })
       } 

    },
    reducers: {
        changeProlist(state: IProModelState, action: any): any {
            // console.log('3333333')
          return {
            ...state,
            prolist: action.payload,
          }
        }
    },
    subscriptions: {
        setup({ dispatch, history }: any) {
            // console.log('11111')
          return history.listen(({ pathname }: any) => {
            if (pathname === '/pro/list') { // 相当于componentDidMount周期
              dispatch({
                type: 'getProlistFn',
              });
            }
          });
        },
    }
}

export default proModel
