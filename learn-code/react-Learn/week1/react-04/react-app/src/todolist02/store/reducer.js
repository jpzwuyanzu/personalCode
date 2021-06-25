const defaultState = {
    list: ['task1', 'task2', 'task3']
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            //对象合并， 合并list
        return { ...state, list: [...state.list, action.data] }
        case 'REMOVE_ITEM':
            //对象合并， 合并list
            // state.list.splice(action.index, 1)
           const arr =  state.list.filter((item,index) => {
                return index !== action.index
            })
            return { ...state, list: arr }
    
        default:
            return state
    }
}
export default reducer