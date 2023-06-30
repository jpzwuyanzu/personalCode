import { createSlice } from '@reduxjs/toolkit'

// 定义初始化状态类型
interface CollapseState {
    status: boolean
}

// 定义初始化数据
const initialState: CollapseState = {
    status: false
}

//定义状态的名称字符串常量
export const COLLAPSE_FATURE_KEY: any = 'collapse'

//actions: 对象类型，用于存储action creator函数
const { actions, reducer: CollapseReducer } = createSlice({
    name: COLLAPSE_FATURE_KEY,// name 将会作为action对象中type属性值的前缀
    initialState, //初始状态
    reducers: {
        //修改状态的任务
        switchCollapsed: (state: CollapseState) => {
            //此处可以直接对状态进行修改操作，因为内部已经集成了不可变的数据结构，所以此处不会修改原有的状态
            //而是返回了最新的状态，内部帮助我们自动赋值了最新的状态
            state.status = !state.status;
        }
    }
})
// 导出action creator函数
export const { switchCollapsed } = actions;
//导出reducer函数
export default CollapseReducer;