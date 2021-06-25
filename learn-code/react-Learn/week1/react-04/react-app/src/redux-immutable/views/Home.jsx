import React, { Component } from 'react';
import {connect } from 'react-redux'
import { getBannerListAction, getProListAction } from '../store/actionCreators/home'
@connect( state => ({
    // bannerlist: state.get('bannerlist'), 单独reducer的时候用这种写法
    // proplist: state.get('proplist')
    bannerlist: state.getIn(['home','bannerlist']),
    prolist: state.getIn(['home','prolist'])
}) ,dispatch => ({
    getBannerList() {
        dispatch(getBannerListAction())
    },
    getProList() {
        dispatch(getProListAction())
    }
}))
class Home extends Component {

    componentDidMount() {
        this.props.getBannerList()
        this.props.getProList()
    }


    render() {
        const {bannerlist, prolist}  = this.props
        return (
            <div>
                <ul>
                    {
                       bannerlist && bannerlist.map((item,index) => (
                            <li key = { index }>{ item.positionName }</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Home;
