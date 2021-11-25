import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

import test from './middware/test'

const middware = applyMiddleware(thunk, test)
export default createStore(reducer,middware)
