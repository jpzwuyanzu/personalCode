
import React, { Component } from 'react'

class App extends Component {
    state = {
        xing: '',
        ming: ''
    }

    changeInputHandler = ( name, event) => {
        // console.log(event.target.name, event.target.value)
        this.setState({
            [name] : event.target.value
        })
    }

    render () {
        const { xing, ming } = this.state
        return (
            <>
                <div>
                    <label>xing</label>
                    <input type="text" placeholder="xing" name="xing" value={ xing } onChange={ (event) => { this.changeInputHandler('xing', event) } } />
                </div>
                <div>
                   <label>ming</label>
                    <input type="text" placeholder="ming" name="ming" value={ ming } onChange={ (event) => { this.changeInputHandler('ming', event) } } />
                </div>
                { xing } { ming }
            </>
        )
    }
}

export default App