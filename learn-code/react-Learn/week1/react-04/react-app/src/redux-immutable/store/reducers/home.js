 import {Map} from 'immutable'
//  import { 
//      CHANGE_BANNER_LIST,
//      CHANGE_KIND_LIST,
//      CHANGE_PRO_LIST
//      } from '../actionTypes'
import * as types from '../actionTypes'
 const reducer = (state = Map({
     bannerlist:[1],
     proplist:[2]
 }),action) => {
    switch (action.type) {
        case types.CHANGE_BANNER_LIST:
            return state.set('bannerlist', action.data)
        case types.CHANGE_PRO_LIST:
            return state.set('prolist', action.data)
        default:
            return state
    }
 } 

 export default reducer