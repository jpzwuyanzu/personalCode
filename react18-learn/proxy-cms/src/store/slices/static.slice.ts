import { createSlice } from '@reduxjs/toolkit'

interface chatPeople {
    chatPeople: number
    totalRechargeCount: number
    rechargePeople: number
    rechargeCount: number
}

//定义初始化数据
const initialState: chatPeople = {
    chatPeople: 0,
    totalRechargeCount: 0,
    rechargePeople: 0,
    rechargeCount: 0
}

//定义状态名称字符串常量
export const CHATPEOPLE_FETURE_KEY: any = 'chatPeople'

//action: 对象类型，用于存储action creator函数
const { actions, reducer: ChatPeopleReducer } = createSlice({
    // name 将会作为action对象中type属性值的前缀
    name: CHATPEOPLE_FETURE_KEY,
    //初始状态
    initialState,
    reducers: {
        switchChatPeopleNum: (state: chatPeople, action: any) => {
            state.chatPeople = Number(action.payload.chatPeople)
            state.totalRechargeCount = Number(action.payload.totalRechargeCount)
            state.rechargePeople = Number(action.payload.rechargePeople)
            state.rechargeCount = Number(action.payload.rechargeCount)
        }
    }
})

export const { switchChatPeopleNum } = actions;

export default ChatPeopleReducer