let state = { count: 0 };

//纯函数 ---返回新的状态
// 输入一定，输出就一定确定， 入口的参数不能修改
const changeState = (state, action) => {

    switch (action.type) {
        case "INCRENMENT": //触发添加
            return { //返回的是一个新的对象，没有修改入参state, 扩展运算符合并，深拷贝
                ...state,
                count: state.count + 1
            }
        case "DECREMENT":
            return Object.assign({}, state, { count: state.count - 1 })  //返回的是一个新的对象，没有修改入参state
        default:
            return state
    }
}
const renderCount = () => {
    document.getElementById('count').innerHTML = state.count;
}
const createStore = () => {
    //dispatch: 触发修改状态的方式
    //subscribe: 订阅-- 如果数据改变要以何种方式更新视图
    //getState: 获取状态
    const getState = () => state
    const dispatch = (action) => {
        state = changeState(state, action)
        renderCount()
    }
    return {getState, dispatch }
}

const store = createStore()
export default store