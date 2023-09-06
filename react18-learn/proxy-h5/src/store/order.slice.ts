import { createSlice } from '@reduxjs/toolkit'

//定义接口
interface IsUpdateState {
    status: boolean
}

// 定义初始状态
const initialState: IsUpdateState = {
    status: false
}

//定义常量名称
export const UPDATE_STATE_KEY: string = 'updateState';

const { actions, reducer: UpdateStateReducer } = createSlice({
    name: UPDATE_STATE_KEY,
    initialState: initialState,
    reducers: {
        switchState: (state: IsUpdateState, { payload }: any) => {
            state.status = payload.status;
        }
    }
})

export const { switchState } = actions;

export default UpdateStateReducer;