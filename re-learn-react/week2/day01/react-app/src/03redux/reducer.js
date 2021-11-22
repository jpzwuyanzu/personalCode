
const defaultState = {
    count: 0
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return Object.assign({}, state, { count: state.count - 1 })
        default:
            return state
    }
}

export default reducer