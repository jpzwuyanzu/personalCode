import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from '../06-Redux/redux/store'

export default function City() {

    const [list, setList] = useState(['北京', '上海', '深圳', '广州']);
    const navigate = useNavigate();

    return (
        <div>
            city
            <ul>
                {
                    list.map((item) => <li key={ item } onClick={ () => {
                        store.dispatch({
                            type: "change-city",
                            payload: item
                        })
                        navigate('/cinemas')
                    } }>{ item }</li>)
                }
            </ul>
        </div>
    )
}
