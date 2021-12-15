import { adminLogin } from './../../api/admin'
import * as types from './../actionTypes'
const  userAction = (values) => {
    return (dispatch) => {
        return new Promise(resolve => { //将后续的业务逻辑交给组件处理
            adminLogin(values).then(res => {
                console.log(res)
                console.log(res.data[values.username])
                // 修改状态
                dispatch({
                    type: types.CHANGE_ADMINNAME,
                    payload: res.data[values.username]['adminname']
                })
                dispatch({
                    type: types.CHANGE_TOKEN,
                    payload: res.data[values.username]['token']
                })
                dispatch({
                    type: types.CHANGE_LOGINSTATE,
                    payload: 'true'
                })
                dispatch({
                    type: types.CHANGE_ROLE,
                    payload: res.data[values.username]['roleid']
                })
                resolve(res.data[values.username])
            })
        })
    }
}

export default userAction