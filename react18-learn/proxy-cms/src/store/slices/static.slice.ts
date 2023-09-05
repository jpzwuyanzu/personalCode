import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { setCookieItem, getCookieItem } from './../../utils/common'

interface IStatic {
    static: any
}

//定义初始化数据
const initialState: IStatic = {
    static: {}
}

//定义状态名称字符串常量
export const STATIC_FETURE_KEY: any = 'static'

//action: 对象类型，用于存储action creator函数
const { actions, reducer: StaticReducer } = createSlice({
    // name 将会作为action对象中type属性值的前缀
    name: STATIC_FETURE_KEY, 
    //初始状态
    initialState,
    reducers: {
        changeStatic: (state: IStatic, action: any) => {
            console.log(action)
            state.static = action.payload
            
        }
    }
})

export const { changeStatic } = actions;

export default StaticReducer