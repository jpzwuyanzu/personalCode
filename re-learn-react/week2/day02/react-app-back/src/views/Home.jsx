import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getBannerListAction } from './../store/actionCreators/home'


@connect(state => ({
    bannerlist: state.getIn(['home', 'bannerlist'])
}), dispatch => ({
    getBannerList: () => dispatch(getBannerListAction)
}))
class Home extends Component {

    componentDidMount() {
        this.props.getBannerList()
    }

    render() {
        const { bannerlist } = this.props
        return (
            <div>
                <ul>
                    {
                        bannerlist && bannerlist.map((item, index) => {
                            return (
                                <li key = { item.proid }>
                                    <p>{ item.proname }</p>
                                    <img src={ item.proimg } style={{ width: '100%' }} alt=""/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Home;
