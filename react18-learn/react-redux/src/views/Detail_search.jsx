import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {

    const [searchParams, setSearchParams] = useSearchParams()
    //searchParams.get('id') 获取参数
    //searchParams.has('id') 判断是否存在该参数
    //searchParams.set('id') 可以改变参数

    return (
        <div>
            detail--{ searchParams.get('id') }
            <button onClick={ () => {
                setSearchParams({ id: 1000 })
            } }>猜你喜欢</button>
        </div>
    )
}
