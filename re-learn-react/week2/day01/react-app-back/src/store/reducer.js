const defaultState = {
    list: ['test1', 'test2', 'test3']
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
        return { ...state, list: [...state.list, action.payload] }
        case 'DEL_ITEM':
            const arr =state.list.filter((item, index) => {
                return index !== action.payload
            })
        return { ...state, list: [...arr] }
        default:
            return state
    }
}

export default reducer