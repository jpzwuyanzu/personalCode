import { Map } from 'immutable'
import * as tyeps from './../actionTypes'
import { getItem } from './../../utils/common'

const reducer = (state = Map({
    adminname: getItem('adminname') || '',
    role: getItem('role') || '',
    loginState:  getItem('loginState') === 'true' || false,
    token: getItem('token') || ''
}), action) => {
    switch (action.type) {
        case tyeps.CHANGE_ADMINNAME:
            return state.set('adminname', action.payload)
        case tyeps.CHANGE_LOGINSTATE:
            return state.set('loginState', action.payload)
        case tyeps.CHANGE_TOKEN:
            return state.set('token', action.payload)
        case tyeps.CHANGE_ROLE:
            return state.set('role', action.payload)
        default:
           return state
    }
}


export default reducer