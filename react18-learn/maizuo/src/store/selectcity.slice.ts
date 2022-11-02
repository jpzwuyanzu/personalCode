import { createSlice } from '@reduxjs/toolkit'

//定义接口
interface ICity {
    cityId: number
    isHot: number
    name: string
    pinyin: string
}

//定义初始状态
const initialState: ICity = {
    cityId: 440300,
    isHot: 0,
    name: '深圳',
    pinyin: 'shenzhen'
}

// 定义常量名称
export const SELECT_CITY_KEY: string = 'selectcity';


const { actions, reducer: SelectCityReducer } = createSlice({
    name: SELECT_CITY_KEY,
    initialState,
    reducers: {
        selectCity: (state: ICity, { payload }: any) => {
            state.cityId = payload.cityId
            state.isHot = payload.isHot
            state.name = payload.name
            state.pinyin = payload.pinyin
        }
    }
})

export const { selectCity } = actions;

export default SelectCityReducer;