import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from '../06-Redux/redux/store';
import { getCinemaListAction } from './../06-Redux/redux/actionCreator/getCinemaListAction'

export default function Cinema(props) {

    const [cityName, setCityName] = useState(store.getState().CityReducer.cityname);
    const [cinemaList, setCinemaList] = useState(store.getState().CinemaListReducer.list)
    const navigate = useNavigate();
     useEffect(() => {
        if(store.getState().CinemaListReducer.list.length === 0) {
            //去后台取数据
            // actionCreator 在这里处理异步处理
            store.dispatch(getCinemaListAction('8989')).then(res => {
                setCinemaList(res)
            })
        } else {
            // console.log('使用缓存')
        }
     }, [])

    return (
        <div>
            <div onClick={ ()=> {
                navigate('/city')
            } }>城市： { cityName }</div>
           <div>
               <ul>
                   <li></li>
               </ul>
           </div>
        </div>
    )
}
