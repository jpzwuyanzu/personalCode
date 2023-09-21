import { createSlice } from '@reduxjs/toolkit'

interface unreadNum {
    unreadNum: number
    isRefreshCus: boolean
}

//定义初始化数据
const initialState: unreadNum = {
    unreadNum: 0,
    isRefreshCus: false //false代表不用刷新, true代表要刷新
}

//定义状态名称字符串常量
export const UNREADNUM_FETURE_KEY: any = 'unreadNum'

//action: 对象类型，用于存储action creator函数
const { actions, reducer: UnreadNumReducer } = createSlice({
    // name 将会作为action对象中type属性值的前缀
    name: UNREADNUM_FETURE_KEY, 
    //初始状态
    initialState,
    reducers: {
        switchUnreadNum: (state: unreadNum, action?: any) => {
            if(action.payload.ac === "equal") {
                state.unreadNum  = Number(action.payload.num)
            } else if(action.payload.ac === "add") {
                state.unreadNum += Number(action.payload.num)
            } else if(action.payload.ac === 'fresh') {
                state.isRefreshCus = action.payload.value
            }
        }
    }
})

export const { switchUnreadNum } = actions;

export default UnreadNumReducer