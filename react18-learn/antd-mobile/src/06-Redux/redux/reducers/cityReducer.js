const CityReducer = (prevState={ 
    cityname: '北京'
 }, action={}) => {
    let newState = { ...prevState }
    switch (action.type) {
        case 'change-city':
            newState.cityname = action.payload
            return newState
        default:
            return prevState
    }
}

export default CityReducer