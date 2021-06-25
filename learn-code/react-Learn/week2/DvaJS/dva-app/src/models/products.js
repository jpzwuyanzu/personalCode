import { getProlist } from './../services/example'
export default {
    namespace: 'products',
    state: {
        prolist:[]
    },
    reducers: {
        changeProlist (state, action) {
            return{ ...state, prolist: action.payload }
        }
    },
    effects: {
        * getProlistFn (params, {call, put}) {
            const res = yield call(getProlist)
            console.log(res)
            yield put ({
                type: 'changeProlist',
                payload: res.data
            })
        }
    },
    subscriptions:{
        setup({dispatch, history}) {
            return history.listen(({ pathname }) => {
                if(pathname === '/product') {
                    // dispatch({
                    //     type: 'getProlistFn'
                    // })
                }
            })
        }
    }
}