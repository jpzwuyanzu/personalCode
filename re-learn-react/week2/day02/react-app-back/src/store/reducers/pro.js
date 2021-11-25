import { Map } from 'immutable'
import * as types from './../actionTypes'

const reducer = (state=Map({
    prolist: []
}), action) => {
    switch (action.type) {
        case types.CHNAGE_PRO_LIST:
            return state.set('prolist', action.payload)
        default:
            return state
    }
}

export default reducer