import React from 'react';
import { Result, Button } from 'antd'

const ThirdStep = (props) => {

    const { changeCurrent } = props

    return (
        <>
             <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console" onClick={() => {changeCurrent(0)}}>
        再来一次
      </Button>,
      <Button key="buy">查看记录</Button>,
    ]}
  />
        </>
    );
}

export default ThirdStep;
