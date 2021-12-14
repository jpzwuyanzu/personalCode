import { loginAdmin } from './../../api/user'
import * as types from './../actionTypes'

const userAction = (values) => {
    return (dispatch) => {
        return new Promise(resolve => {
            loginAdmin(values).then(res => {
                // console.log(res)
                //在这里把用户信息保存到状态管理器中
                dispatch({
                    type: types.CHANGE_ADMIN_NAME,
                    payload: res.data[values.username].adminname
                })
                dispatch({
                    type: types.CHANGE_TOKEN,
                    payload: res.data[values.username].token
                })
                dispatch({
                    type: types.CHANGE_LOGIN_STATE,
                    payload: 'true'
                })
                dispatch({
                    type: types.CHANGE_ROLE,
                    payload: res.data[values.username].roleid
                })
                //把数据返回到ui组件
                resolve(res.data[values.username])
            })
        })
    }
}

export default  userAction