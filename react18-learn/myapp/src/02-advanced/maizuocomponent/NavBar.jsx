import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <div style={{ background: 'yellow', textAlign: 'center' }}>
                <button style={{ float: 'left' }}>back</button>
                <span>εεΊ§</span>
                <button style={{ float: 'right' }} onClick={ () => {
                    this.props.myEvenet()
                } }>ζη</button>
            </div>
        )
    }
}
