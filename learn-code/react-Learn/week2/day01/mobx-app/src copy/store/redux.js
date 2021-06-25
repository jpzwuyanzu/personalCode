import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'
// import home from './modules/home'
// import kind from './modules/kind'

const home = (state = {
    bannetlist: []
}, action) => {
    switch (action.type) {
        case 'CHANGE_BANNER_LIST':
         return { ...state, bannetlist: action.payload }
         default:
          return state
    }
}


const reducer = combineReducers({home, kind})

const store = createStore(reducer, applyMiddleware(thunk))

export default store