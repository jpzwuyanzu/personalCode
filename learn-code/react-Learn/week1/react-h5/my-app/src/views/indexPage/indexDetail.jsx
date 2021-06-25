import React from 'react';
import { withRouter } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import './indexDetail.scss'

const IndexDetail = withRouter((props) => {

    console.log(props.location.state.params)

    return (
        <div className="homePageDetail">
           <div className="detailContent">
               <div className="detail-header">
                   <div className="left-icon" onClick= { () => props.history.goBack(-1) }><Icon type="left" size="lg" /></div>
                   <div className="center-title">产品详情</div>
               </div>
               <div className="detail-img">
                   <img src='https://p1.meituan.net/440.0/auditimage/ae70515ae9a41983c2e846c8585ef2a0883090.jpg.webp' alt=""/>
               </div>
               <div className="detail-info">
                   <div className="info-title">阿尔滨水上乐园全天门票成人票</div>
                   <div className="price-info">
                       <span className="now-price-sym">¥</span>
                       <span className="noe-price-num">59</span>
                       <span className="pri-place">门市价</span>
                       <span className="pplace-pri">¥69</span>
                       <span className="sell-mount">已售24384953</span>
                   </div>
               </div>
           </div>
           <div className="detailFooter">详情页面底部</div>
        </div>
    );
})

export default IndexDetail;
