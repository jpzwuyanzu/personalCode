import { Map } from 'immutable'
import * as types from '../actiontypes'

const reducer = (state = Map({
    collapsed: false,
    color: '#fff'
}),action) => {
    switch (action.type) {
        case types.CHANGE_CPLLAPSED:
            return state.set('collapsed', !state.get('collapsed'))
        case types.CHANGE_COLOR:
            return state.set('color', action.payload)
        default:
            return state
    }
}

export default reducer