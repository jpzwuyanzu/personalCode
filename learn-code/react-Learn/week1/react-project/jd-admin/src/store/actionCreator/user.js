import * as types from './../actiontypes'
const userAction = (values) => {
    return (dispatch) => {
        return new Promise(resolve => {
            //异步操作
            fetch('/userInfo.json').then(res => res.json()).then(result => {
                console.log(result)
                // 修改状态 
                dispatch({
                    type: types.CHANGE_ADMIN_NAME,
                    payload: result.result[values['username']].adminname
                })
                dispatch({
                    type: types.CHANGE_ADMIN_TOKEN,
                    payload: result.result[values['username']].token
                })
                dispatch({
                    type: types.CHANGE_ADMIN_ROLE,
                    payload: result.result[values['username']].role
                })
                dispatch({
                    type: types.CHANGE_LOGIN_STATE,
                    payload: result.result[values['username']].loginState
                })
                resolve(result.result[values['username']])
            })
        })
    }
}

export default userAction