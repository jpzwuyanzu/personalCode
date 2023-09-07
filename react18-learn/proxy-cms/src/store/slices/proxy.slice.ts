import { createSlice } from '@reduxjs/toolkit'

interface amountNum {
    amountNum: number
    openStatus: any
}

//定义初始化数据
const initialState: amountNum = {
    amountNum: 0,
    openStatus: 1
}

//定义状态名称字符串常量
export const AMOUNTNUM_FETURE_KEY: any = 'amountNum'

//action: 对象类型，用于存储action creator函数
const { actions, reducer: AmountNumReducer } = createSlice({
    // name 将会作为action对象中type属性值的前缀
    name: AMOUNTNUM_FETURE_KEY,
    //初始状态
    initialState,
    reducers: {
        switchAmountNum: (state: amountNum, action: any) => {
            state.amountNum = Number(action.payload.amount)
            state.openStatus = Number(action.payload.openStatus)

        }
    }
})

export const { switchAmountNum } = actions;

export default AmountNumReducer