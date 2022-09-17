import React, { Component } from 'react'
import { Button } from 'antd';

export default class App extends Component {
    render() {
        return (
            <div>
                <Button type="primary" danger  onClick={ () => {
                    console.log('ggg')
                } }>Primary Button</Button>
            </div>
        )
    }
}
