import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const Register = () => {

    const [myForm] = Form.useForm()
    const [flag, setFlag] = useState(true)

    const onFinish = (values) => {
        console.log('Success:', values);
      }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      }

      const sendCode = (values) => {
        console.log(myForm.getFieldValue())
      }

      const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      const handlerPhone = (e) => {
        //   console.log(e.target.value)
          //在这里正则验证手机号
          phoneReg.test(e.target.value) ? setFlag(false) : setFlag(true)
      }

    return (
        <Form
      form={ myForm }
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, message: '请输入手机号!' }]}
      >
        <Row>
            <Col span={ 24 }>
              <Input maxLength={ 11 } onChange={ handlerPhone } />
            </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label="手机验证码"
        name="telcode"
        rules={[{ required: true, message: '请输入手机验证码!' }]}
      >
        <Row>
            <Col span={ 16 }>
            <Input />
            </Col>
            <Col span={ 8 }>
            <Button type="primary" onClick={ sendCode } disabled = { flag }>发送验证码</Button>
            </Col>
        </Row>
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
          <Row>
              <Col span={ 24 }>
              <Input.Password />
              </Col>
          </Row>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    );
}

export default Register;
