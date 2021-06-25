import {Map} from 'immutable'
import * as types from '../actionTypes'
 const reducer = (state = Map({
     kindlist:[],
 }),action) => {
    switch (action.type) {
        case types.CHANGE_BANNER_LIST:
            return state.set('kindlist', action.data)
        default:
            return state
    }
 } 

 export default reducer