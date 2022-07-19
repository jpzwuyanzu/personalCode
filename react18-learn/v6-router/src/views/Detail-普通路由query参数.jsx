import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {

    
    const [searchParams, setSearchParams] = useSearchParams()
    //获取参数 searchParams.get('id')
    // 判断参数是否存在 searchParams.has('id')
    // 同时页面内也可以调用set方法修改路由 setSearchParams({ id: 4 })
    console.log(searchParams.get('id'))

    return (
        <div>
            Detail
            <button onClick={ () => { setSearchParams({ id: 1000 }) } }>猜你喜欢</button>
        </div>
    )
}
