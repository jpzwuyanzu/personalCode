import React, { Component } from 'react'

export default class List extends Component {
    state = {
        list: []
    }
    // UNSAFE_componentWillReceiveProps(props) {
    //     this.setState({
    //         list: [...this.state.list, props.keyword]
    //     })
    // }
    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps',prevProps)
        console.log('prevState', prevState)
        console.log('props', this.props)
        if(prevProps.keyword !== this.props.keyword) { //要修改数据，必须添加判断
            this.setState({
                list: [...this.state.list, this.props.keyword]
            })
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return(
                                <li key={ index }>{ item }
                                <button onClick={ () => {
                                    this.state.list.splice(index, 1)
                                    this.setState({ list: this.state.list })
                                } }>删除</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
