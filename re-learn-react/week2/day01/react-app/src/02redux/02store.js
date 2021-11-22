
let state = { count: 0 }

// 纯函数 --- 返回新的状态
// 输入一定，输出就一定确定
// 入口参数不能修改
const changeState = (state, action) => {
    switch (action.type) {
        case 'INCREMENT': //触发添加
           return { //返回的是一个新的对象, 没有修改传入的state
               ...state,
               count: state.count + 1
           }
        case 'DECREMENT':
            return Object.assign({}, state, { count: state.count - 1 }) //返回的是一个新的对象, 没有修改传入的state
        default:
            break;
    }
}

const renderCount = () => {
    document.getElementById('count').innerHTML = state.count
}

const createStore = () => {
    const getState = () => state

    const dispatch = (action) => {
        state = changeState(state, action)
        renderCount()
    }

    return {
        getState,
        dispatch
    }
}

const store = createStore()

export default store