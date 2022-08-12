import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FileItem(item) {

    const navigate = useNavigate()
    const handleChangePage = (id) => {
        //跳转页面
        //navigate
        // 利用url 传递参数 /detail?id=1000
        // navigate(`/detail?id=${id}`)
        navigate(`/detail/${id}`)

        
        //路由传递参数 /detail/1000
    }

    return (
        <li onClick={ () => { handleChangePage(item.filmId)} }>{ item.name }</li>
    )
}
