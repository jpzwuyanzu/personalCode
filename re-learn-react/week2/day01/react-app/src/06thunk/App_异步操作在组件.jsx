import React, { Component } from 'react'

import { connect } from 'react-redux'


@connect(state =>  ({ list: state.list }) , dispatch => ({
    getList () {
        fetch('/pro.json').then(res => res.json()).then(result => {
            dispatch({
                type: 'CHANGE_LIST',
                payload: result
            })
        })
    }
}))
 class App extends Component {

    componentDidMount() {
        this.props.getList()
    }

    render() {
        const { list } = this.props
        return (
            <ul>
                {
                    list && list.map((item, index) => {
                        return(
                            <li key={ index }>{ item.positionName }</li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default App