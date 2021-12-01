import { Map } from 'immutable'
import * as types from './../actionTypes'

const reducer = (state = Map({
    collapsed: false
}), action) => {
    switch (action.type) {
        case types.CHANGE_COLLAPSED:
            return state.set('collapsed', !state.get('collapsed'))
        default:
            return state
    }
}

export default reducer