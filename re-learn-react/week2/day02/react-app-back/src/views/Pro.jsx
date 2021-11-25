import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProListAction } from './../store/actionCreators/pro'


@connect(state => ({
    prolist: state.getIn(['pro', 'prolist'])
}), dispatch => ({
    getProList: () => dispatch(getProListAction)
}))
class Pro extends Component {

    componentDidMount() {
        this.props.getProList()
    }

    render() {
        const { prolist } = this.props
        return (
            <div>
                <ul>
                    {
                        prolist && prolist.map((item, index) => {
                            return (
                                <li key = { item.proid }>
                                    { item.proname }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Pro;
