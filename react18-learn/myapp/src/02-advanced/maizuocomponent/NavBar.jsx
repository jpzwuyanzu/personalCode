import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <div style={{ background: 'yellow', textAlign: 'center' }}>
                <button style={{ float: 'left' }}>back</button>
                <span>卖座</span>
                <button style={{ float: 'right' }} onClick={ () => {
                    this.props.myEvenet()
                } }>我的</button>
            </div>
        )
    }
}
