import { Map } from 'immutable'
import * as types from './../actionTypes'
import { getItem } from './../../utils/common'

const reducer = (state = Map({
    adminname: getItem('adminname') || '',
    role: getItem('role') || '',
    loginState:  getItem('loginState') === 'true' || 'false',
    token: getItem('token') || false
}), action) => {
    switch (action.type) {
        case types.CHANGE_ADMIN_NAME:
            return state.set('adminname', action.payload)
        case types.CHANGE_LOGIN_STATE:
            return state.set('loginState', action.payload)
        case types.CHANGE_TOKEN:
            return state.set('token', action.payload)
        case types.CHANGE_ROLE:
            return state.set('role', action.payload)
        default:
           return state
    }
}


export default reducer