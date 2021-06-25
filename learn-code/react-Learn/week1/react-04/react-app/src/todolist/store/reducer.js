const defaulState = {
    list:['tab1','tab2','tab3']
}

const reducer = (state = defaulState,action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, list: [...state.list, action.data] }
        case 'DEl_ITEM':
            const arr =  state.list.filter((item,index) => {
                return action.index !==  index
            })
            return { ...state, list: arr }
        default:
            return state
    }
}

export default reducer
