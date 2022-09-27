const TabBarReducer = (prevState={ 
    show: true,
 }, action={}) => {
    let newState = { ...prevState }
    switch (action.type) {
        case 'hide':
            newState.show = false
            return newState
        case 'show':
            newState.show = true
            return newState
        default:
            return prevState
    }
}

export default TabBarReducer