import React, { useState } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Swiper, Image } from 'antd-mobile'


export default function Film() {
    const [list, setList] = useState<string[]>(['563','6767', '8989', '44444', '90990'])
    const navigate = useNavigate()
    return (
        <div>
            <Swiper>
                <Swiper.Item>
                    <Image src="https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60" />
                </Swiper.Item>
            </Swiper>
            <Button color="danger">上一页</Button>
            <Button color="primary">下一页</Button>
            <ul className="test">
                {
                    list.map((item, index) => <li key={ index } onClick={ () => {
                        navigate(`/detail/${item}`)
                    } }>{ item }</li>)
                }
            </ul>
        </div>
    )
}
