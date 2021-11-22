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
const createStore = (changeState) => {
    //dispatch: 触发修改状态的方式
    //subscribe: 订阅-- 如果数据改变要以何种方式更新视图
    //getState: 获取状态
    const getState = () => state

    //发布订阅者模式
    const listeners = [];


    //实现订阅者 subscribe
    const subscribe = (listener) => {
        listeners.push(listener)
    }


    const dispatch = (action) => {
        state = changeState(state, action)
        //数据发生改变 改变视图
        // 发布者 publish
        listeners.forEach( listener => listener())
    }
    return {getState, dispatch,subscribe }
}

const store = createStore(changeState)

//如果状态发生改变，希望触发renderCount函数
store.subscribe(renderCount)



export default store