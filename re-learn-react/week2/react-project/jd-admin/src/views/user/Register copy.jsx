import React from 'react';
import { Form, Input, Button } from 'antd';

const { Search } = Input

const Register = () => {

    const [myForm] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success:', values);
      }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      }

      const sendCode = (values) => {
        console.log(myForm.getFieldValue())
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
        <Input />
      </Form.Item>
      <Form.Item
        label="手机验证码"
        name="telcode"
        rules={[{ required: true, message: '请输入手机验证码!' }]}
      >
        <Search enterButton="发送短信验证码" onSearch={ sendCode } disabled />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
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
