import React, { memo } from 'react'
import { Button } from 'antd'
import axios from 'axios'

const Home = () => {
    const ajax = () => {
        axios.post('http://localhost:3000/posts/',{
            title: 'test',
            author: 'tony'
        })
    }
    return (
        <div>
            <Button type="primary" onClick={ () => {
                ajax()
            } }>button</Button>
            home
        </div>
    )
}

export default Home
