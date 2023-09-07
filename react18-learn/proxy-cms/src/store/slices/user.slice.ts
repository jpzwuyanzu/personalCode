import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginNow } from './../../api/index'

// interface UserInfo {
//     userInfo: any
//     // token: any
//     // userName: any
//     // remark: any
//     // menuList: any
//     // userType: any
//     // permissions: any
//     // password: any
//     // oldpassword: any
//     // id: any

// }
const initialState: any = {
    userInfo: localStorage.getItem('currentUserInfo') ? JSON.parse(localStorage.getItem('currentUserInfo') as any) : {}
    // token: "",
    // userName: "",
    // remark: "",
    // menuList: [],
    // userType: "",
    // permissions: "",
    // password: "",
    // oldpassword: "",
    // id: ""
}

export const USER_FEATURE_KEY: any = 'user';

export const loginSys: any = createAsyncThunk(`${USER_FEATURE_KEY}/loginSys`, async (payload: any) => {
    const resp: any = await LoginNow(payload)
    return { data: resp.data, code: resp.code, msg: resp.msg }
})

const { reducer: UserReducer } = createSlice({
    name: USER_FEATURE_KEY,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginSys.pending, () => {
                // console.log('pending')
            })
            .addCase(loginSys.fulfilled, (state, action) => {
                state.userInfo = { ...action.payload.data };
                // state.token = action.payload.data.tokenInfo.tokenValue;
                // state.userName = action.payload.data.username;
                // state.remark = action.payload.data.remark;
                // state.menuList = action.payload.data.menuList;
                // state.userType = action.payload.data.userType;
                // state.permissions = action.payload.data.permissions;
                // state.password = action.payload.data.password;
                // state.oldpassword = action.payload.data.oldpassword;
                // state.id = action.payload.data.id;
                // console.log(state)
                sessionStorage.setItem('token', action.payload.data.tokenInfo.tokenValue)
            })
            .addCase(loginSys.rejected, (state, action) => {
                console.log(state, action.error)
            })
    },
})

export default UserReducer