const reducer = (state = {
    arr : [1,2,4],
    list:[]
}, action) => {
    switch (action.type) {
        case 'CHANGE_ARR':
            return { ...state, arr: [...action.payload] }
        case 'CHANGE_LIST':
            return { ...state, list: [...action.payload] }
        default:
            return state
    }
}

export default reducer