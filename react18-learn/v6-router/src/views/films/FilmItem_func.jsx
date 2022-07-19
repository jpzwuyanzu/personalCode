import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FilmItem(item) {

    const navigate = useNavigate()
    const handleChangePage = (id) => {
        //2.路由传递参数 /detail/1000
        navigate(`/detail/${id}`)

    }

    return (
        <li onClick={ () => handleChangePage(item.filmId) }>{item.name}</li>
    )
}
