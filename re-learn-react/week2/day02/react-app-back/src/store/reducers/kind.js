import { Map } from 'immutable'
import * as types from './../actionTypes'

const reducer = (state=Map({
    kindlist: []
}), action) => {
    switch (action.type) {
        case types.CHNAGE_KIND_LIST:
            return state.set('kindlist', action.payload)
        default:
            return state
    }
}

export default reducer