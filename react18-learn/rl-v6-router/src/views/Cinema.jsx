import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from '../06-Redux/redux/store';

export default function Cinema(props) {

    const [cityName, setCityName] = useState(store.getState().CityReducer.cityname);
    const navigate = useNavigate()

    return (
        <div>
            <div onClick={ ()=> {
                navigate('/city')
            } }>城市： { cityName }</div>
           Cinema
        </div>
    )
}
