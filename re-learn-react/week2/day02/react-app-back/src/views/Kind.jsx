import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getKindListAction } from './../store/actionCreators/kind'


@connect(state => ({
    kindlist: state.getIn(['kind', 'kindlist'])
}), dispatch => ({
    getKindList: () => dispatch(getKindListAction)
}))
class Kind extends Component {
    componentDidMount() {
        this.props.getKindList()
    }
    render() {
        const { kindlist } = this.props
        return (
            <div>
                <ul>
                    {
                      kindlist && kindlist.map((item, index) => {
                          return (
                            <li key={ index }>{ item }</li>
                          )
                      })  
                    }
                </ul>
            </div>
        );
    }
}

export default Kind;
