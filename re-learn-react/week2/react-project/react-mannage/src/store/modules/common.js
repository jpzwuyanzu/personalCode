import { Map } from 'immutable'
import * as types from './../actionTypes'

const reducer = (state = Map({
    collapsed: false,
    themeColor: ''
}), action) => {
    switch (action.type) {
        case types.CHANGE_COLLAPSED:
            return state.set('collapsed', !state.get('collapsed'))
        case types.CHANGE_THEME_COLOR:
            return state.set('themeColor', action.payload)
        default:
           return state
    }
}

export default  reducer