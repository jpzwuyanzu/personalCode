import { getItem } from './../../utils/common'
import { Map } from 'immutable'
import * as types from './../actionTypes'
const reducer = (
state=Map({
    adminName:getItem('adminName') || '',
    role: getItem('role')*1 || 0,
    loginState: getItem('loginState') || false,
    token:getItem('token') || ''
}), action) => {
    switch (action.type) {
        case types.CHANGE_USERNAME:
            return state.set("adminName", action.payload)
        case types.CHANGE_ROLE:
            return state.set("role", action.payload)
        case types.CHANGE_LOGINSTATE:
            return state.set("loginState", action.payload)
            case types.CHANGE_TOKEN:
            return state.set("token", action.payload)
        default:
           return state
    }
}

export default reducer