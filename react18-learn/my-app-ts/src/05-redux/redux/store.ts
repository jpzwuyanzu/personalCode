import { createStore } from 'redux'

interface IAction {
    type: string
    payload?: any
}

const reducers = (prevState = {
    isShow: true
}, action: IAction) => {
    const { type } = action
    let newState = { ...prevState }
    switch (type) {
        case 'show':
            newState.isShow = true
            return newState
        case 'hide':
            newState.isShow = false
            return newState
        default:
            return prevState
    }
}

const store = createStore(reducers)

export default store