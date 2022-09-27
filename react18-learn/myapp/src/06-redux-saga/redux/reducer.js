const reducer = (prevState={
    list1: [],
    list2: []
}, action = {}) => {
    let newState = {...prevState}
    switch (action.type) {
        case 'change-list1':
            console.log('change-list1')
            newState.list1 = action.payload
            return newState
        case 'change-list2':
            console.log('change-list2')
            newState.list2 = action.payload
            return newState
        default:
            return prevState
    }
}

export default reducer