import { createSlice } from '@reduxjs/toolkit'

interface IProxy {
    proxy: any
}

//定义初始化数据
const initialState: IProxy = {
    proxy: {}
}

//定义状态名称字符串常量
export const PROXY_FETURE_KEY: any = 'proxy'

//action: 对象类型，用于存储action creator函数
const { actions, reducer: ProxyReducer } = createSlice({
    // name 将会作为action对象中type属性值的前缀
    name: PROXY_FETURE_KEY, 
    //初始状态
    initialState,
    reducers: {
        changeProxy: (state: IProxy, action: any) => {
            state.proxy = action.payload
            
        }
    }
})

export const { changeProxy } = actions;

export default ProxyReducer