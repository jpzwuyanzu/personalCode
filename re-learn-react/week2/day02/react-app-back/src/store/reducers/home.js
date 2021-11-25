import { Map } from 'immutable'
import * as types from './../actionTypes'

const reducer = (state=Map({
    bannerlist: []
}), action) => {
    switch (action.type) {
        case types.CHNAGE_BANNER_LIST:
            return state.set('bannerlist', action.payload)
        default:
            return state
    }
}

export default reducer