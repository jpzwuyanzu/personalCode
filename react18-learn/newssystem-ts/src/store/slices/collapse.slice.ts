import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
//createSlice 用于创建状态切片

// Define a type for the slice state
interface CollapseState {
    status: boolean,
    list: Array<any>
  }
  
  // Define the initial state using that type
  const initialState: CollapseState = {
    status: false,
    list: []
  }

  //定义状态名称字符串常量
  export const COLLAPSE_FEATURE_KEY: any = 'collapse';

//  reduxToolkit 处理异步状态管理, 使用中间件的方式来实现
  export const loadTodos: any = createAsyncThunk(`${COLLAPSE_FEATURE_KEY}/loadTodos`, (payload: string) => {
    try {
        return axios.get(payload).then(res => res.data);
    } catch {
        throw new Error('自定义错误信息')
    }
  })

//actions: 对象类型，用于存储action creator函数
const { actions, reducer: CollapseReducer } = createSlice({
    // name 将会作为action 对象中type属性值的前缀
    // { type: 'collapse/switchCollapsed' }
    name: COLLAPSE_FEATURE_KEY,
    // 初始状态
    initialState: initialState,
    // reducer 函数配置
    reducers: {
        // 修改状态的任务
        switchCollapsed: (state: CollapseState) =>  {
            // 此处可以直接对状态进行操作
            // 因为内部集成了不可变的数据结构，所以此处并不会改变原油状态，
            // 而是返回了新的状态，只不过内部帮我们自动赋值了新的状态
            state.status = !state.status;
        }
    },
    extraReducers: {
        [loadTodos.pending] () {
            // 在这里可以左请求的loading效果
            console.log('pending')
        },
        [loadTodos.fulfilled] (state, action) {
            console.log('fulfilled')
            state.list = [...action.payload.categories]
            console.log(state.list)
        },
        [loadTodos.rejected] (state, action) {
            console.log(action.error)
        }
    }
})
 
// 导出action creator 函数
 export const { switchCollapsed } = actions;

 // 导出reducer函数
 export default CollapseReducer;