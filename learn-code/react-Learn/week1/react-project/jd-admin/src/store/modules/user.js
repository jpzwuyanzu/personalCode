import { Map } from 'immutable'
import * as types from './../actiontypes'
import { getItem } from './../../utils/common'


const reducer = (state = Map({
    adminname:getItem('adminname') || '',
    token:getItem('token') || '',
    role:getItem('role')*1 || '',
    loginState:getItem('loginState') || false
}), action) => {
    switch (action.type) {
        case types.CHANGE_ADMIN_NAME:
           return state.set('adminname', action.payload)
           case types.CHANGE_ADMIN_ROLE:
           return state.set('role', action.payload)
           case types.CHANGE_ADMIN_TOKEN:
           return state.set('token', action.payload)
           case types.CHANGE_LOGIN_STATE:
           return state.set('loginState', action.payload)
        default:
            return state
    }

}

export default reducer