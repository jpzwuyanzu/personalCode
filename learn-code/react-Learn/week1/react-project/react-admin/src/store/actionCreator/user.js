import * as types from './../actionTypes'
const userAction = (values) => {
    return (dispatch) => {
        // 因为登录之后还需要依赖请求的数据做后续处理，所以需要将请求的结果以异步的形式返回，这样ui组件那边才可以进行后续处理
        return new Promise(resolve => {
            fetch('/userinfo.json').then(res => res.json()).then(result => {
                //在这里触发action，修改状态
                dispatch({
                    type:types.CHANGE_USERNAME,
                    payload:result.result[values['username']].userName
                })
                dispatch({
                    type:types.CHANGE_ROLE,
                    payload:result.result[values['username']].role
                })
                dispatch({
                    type:types.CHANGE_LOGINSTATE,
                    payload:result.result[values['username']].loginState
                })

                resolve(result.result[values['username']])
            })
        })
    }
}

export default userAction