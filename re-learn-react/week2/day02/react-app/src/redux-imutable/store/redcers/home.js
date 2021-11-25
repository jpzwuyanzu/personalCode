import { Map } from 'immutable'
import * as types from '../actionTypes'

const reducer = (state = Map({
    bannerlist: [1, 2],
    prolist: []
}), action) => {
    switch (action.type) {
        case types.CHANGE_BANNER_LIST:
            return state.set('bannerlist', action.payload)
        case types.CHANGE_PRO_LIST:
            return state.set('prolist', action.payload)
        default:
            return state
    }
}


export default reducer