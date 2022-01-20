import React from 'react';
import { Row, Col } from 'antd'
import { WechatOutlined, QqOutlined, DingdingOutlined, WeiboOutlined } from '@ant-design/icons'

const Statistics = () => {
    return (
        <div className="static-main-body">
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                        <div className='baseStyle wechat'>
                            <WechatOutlined />
                            <div>
                                <span>136348</span>
                                <div>微信用户</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                    <div className='baseStyle qq'>
                        <QqOutlined />
                        <div>
                            <span>283774</span>
                            <div>QQ用户</div>
                        </div>
                    </div>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                        <div className='baseStyle ding'>
                        <DingdingOutlined />
                        <div>
                            <span>374729</span>
                            <div>钉钉用户</div>
                        </div>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={{paddingLeft:'12px',paddingRight:'12px'}}>
                        <div className='baseStyle weibo'>
                            <WeiboOutlined />
                            <div>
                                <span>27837923</span>
                                <div>微博用户</div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Statistics;
