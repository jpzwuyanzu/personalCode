const defaultState = {
    list: ['task1', 'task2', 'task3']
}

const reducer = (state = defaultState, action) => {
    //console.log(action) //@@redux/INIT4.n.c.s.7.b 
    //---第一次会默认触发一次dispatch，数据初始化
    switch (action.type) {
        case 'ADD_ITEM':
            // 对象合并， 合并list（数组）
            return { ...state, list: [...state.list, action.payload] }
        case 'REMOVE_ITEM': 
          const arr =   state.list.filter((item, index) => {
                return index !== action.payload
            })
            return  { ...state, list: arr }
        default:
            return state
    }
}

export default  reducer