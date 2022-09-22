import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Film() {
    const [list, setList] = useState<string[]>(['563','6767', '8989'])
    const navigate = useNavigate()
    return (
        <div>
            <ul>
                {
                    list.map((item, index) => <li key={ index } onClick={ () => {
                        navigate(`/detail/${item}`)
                    } }>{ item }</li>)
                }
            </ul>
        </div>
    )
}
