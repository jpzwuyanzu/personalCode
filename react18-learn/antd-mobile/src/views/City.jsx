/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

const City = ({ changeCity }) => {
    const [list, setList] = useState(['北京', '上海', '深圳', '广州']);
    const navigate = useNavigate();
    return (
        <div>
            city
            <ul>
                {
                    list.map((item) => <li key={ item } onClick={ () => {
                        changeCity(item)
                        navigate('/cinemas')
                    } }>{ item }</li>)
                }
            </ul>
        </div>
    )
}
const mapStateToProps = {
    changeCity(item) {
        return {
            type: 'change-city',
            payload: item
        }
    }
}

export default connect(null, mapStateToProps)(City)