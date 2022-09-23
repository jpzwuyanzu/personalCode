const reducer = (prevState={
    list1: []
}, action = {}) => {
    let newState = {...prevState}
    switch (action.type) {
        case 'change-list':
            console.log('change-list')
            newState.list1 = action.payload
            return newState
        default:
            return prevState
    }
}

export default reducer