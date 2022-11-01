import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//定义接口
interface IShowTabState {
    status: boolean
}

// 定义初始状态
const initialState: IShowTabState = {
    status: true
}

//定义常量名称
export const SHOW_TAB_KEY: any = 'showtab'

const { actions, reducer: TabBarReducer } = createSlice({
    name: SHOW_TAB_KEY,
    initialState: initialState,
    reducers: {
        switchTabBar: (state: IShowTabState) => {
            state.status = !state.status;
        }
    }
})

export const { switchTabBar } = actions;

export default TabBarReducer;