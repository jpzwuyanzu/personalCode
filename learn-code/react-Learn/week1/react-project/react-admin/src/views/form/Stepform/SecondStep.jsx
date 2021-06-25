import React, { useState } from 'react';
import { Row, Col, Space, Button } from 'antd'

const SecondStep = (props) => {
    const { submitData, changeCurrent  } = props;
    const [loadingState, setLoadingState] = useState(false)

    const sendData = () => {
        setLoadingState(true)
        setTimeout(() => {
            setLoadingState(false)
            changeCurrent(2)
        },1000)
    }


    return (
        <>
        <Space direction="vertical" style={{paddingBottom:'40px'}}>
            <Row span={24}>
                <Col>接收人： {submitData.receivename}</Col>
            </Row>
            <Row span={24}>
                <Col>接收邮箱： {submitData.receiveemail}</Col>
            </Row>
            <Row span={24}>
                <Col>暗号： {submitData.codename}</Col>
            </Row>
            <Row span={24}>
                <Col>电话： {submitData.phone}</Col>
            </Row>
            </Space>
            <br/>
            <Space>
            <Button type="primary" loading={loadingState} onClick={sendData}>
                发送
              </Button>
              <Button style={{ margin: "0 8px" }} onClick={() => {changeCurrent(0)}}>
                重置
              </Button>
            </Space>
        </>
    );
}

export default SecondStep;
