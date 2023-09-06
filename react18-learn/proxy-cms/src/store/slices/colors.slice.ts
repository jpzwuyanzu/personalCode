import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCookieItem } from './../../utils/common'

interface cusColor {
    color: string
}

//定义初始化数据
const initialState: cusColor = {
    color: getCookieItem('color') ? getCookieItem('color') : '#00b96b'
}

//定义状态名称字符串常量
export const CUSCOLOR_FETURE_KEY: any = 'cusColor'

//action: 对象类型，用于存储action creator函数
const { actions, reducer: CusolorReducer } = createSlice({
    // name 将会作为action对象中type属性值的前缀
    name: CUSCOLOR_FETURE_KEY, 
    //初始状态
    initialState,
    reducers: {
        switchCusColor: (state: cusColor, action: PayloadAction<string>) => {
            state.color = action.payload;
        }
    }
})

export const { switchCusColor } = actions;

export default CusolorReducer
