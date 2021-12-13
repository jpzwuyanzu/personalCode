import React from 'react';
import { Form, Input, Button } from 'antd'

const Login = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
      }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      }


    return (
        <div className="loginPage">
            <div className="loginCom">
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
