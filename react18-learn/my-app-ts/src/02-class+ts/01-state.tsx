import React, { Component } from 'react'

export default class App extends Component {



    state = {
        name: 'test'
    }

    render() {
        return (
            <div>
                App- { this.state.name.substring(0,1).toUpperCase() + this.state.name.substring(1) }
                <button onClick={ () => {
                    this.setState({
                        name: 'xiaoming'
                    })
                } }>click</button>
            </div>
        )
    }
}
