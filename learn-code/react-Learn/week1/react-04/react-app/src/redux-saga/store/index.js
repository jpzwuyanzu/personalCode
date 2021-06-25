import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import  createSagaMiddleWare from 'redux-saga'


// const middleware = applyMiddleware(thunk)

const store = createStore(reducer,middleware)

export default store