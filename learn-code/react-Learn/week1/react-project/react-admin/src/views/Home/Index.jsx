import React from 'react';
import { Row, Col } from 'antd'
import { WechatOutlined, QqOutlined, WeiboOutlined, DingdingOutlined } from '@ant-design/icons'
import Echarts from './Echarts'
import TestCharts from './TestCharts'

const HomeIndex = () => {
    
    return (
       <>
        <div className="mainHedaer">
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                        <div className='baseStyle wechat'>
                            <WechatOutlined />
                            <div>
                                <span>999</span>
                                <div>微信</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                    <div className='baseStyle qq'>
                        <QqOutlined />
                        <div>
                            <span>999</span>
                            <div>QQ</div>
                        </div>
                    </div>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                        <div className='baseStyle ding'>
                        <DingdingOutlined />
                        <div>
                            <span>999</span>
                            <div>钉钉</div>
                        </div>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                        <div className='baseStyle weibo'>
                            <WeiboOutlined />
                            <div>
                                <span>999</span>
                                <div>微博</div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <Echarts/>
        <TestCharts/>
       </>
    );
}

export default HomeIndex;
