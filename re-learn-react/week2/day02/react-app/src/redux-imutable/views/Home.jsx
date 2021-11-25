import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getBannerlistAction, getProlistAction } from '../store/actionCreators/home'


@connect(state => {
    return {
        // bannerlist: state.get('bannerlist'), // 单独reducer
        bannerlist: state.getIn(['home', 'bannerlist']),
        prolist: state.getIn(['home', 'prolist'])
    }
}, dispatch => ({
    getBannerList: () => dispatch(getBannerlistAction),
    getProList: () => dispatch(getProlistAction)
}))
class Home extends Component {

    componentDidMount() {
       this.props.getBannerList() 
       this.props.getProList()
    }

    render() {
        const { bannerlist } = this.props
        return (
            <div>
                <ul>
                { bannerlist && bannerlist.map((item ,index) => {
                    return (
                        <li key = { index }>
                            
                            <img src={ item.logo } alt="" style={{ width: '30px', height:'30px' }}/>
                        </li>
                    )
                }) }
                </ul>
            </div>
        );
    }
}

export default Home;
