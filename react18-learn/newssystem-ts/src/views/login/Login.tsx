import React from 'react'
import { Button, message, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import axios from 'axios'

const Login = () =>  {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        Promise.all([
            axios.get('user1.json'),
            axios.get('routeRight.json')
        ]).then(res => {
            if(res[0].data[values.username]) {
                message.success('登录成功')
                localStorage.setItem('token', JSON.stringify(res[0].data[values.username]));
                localStorage.setItem('rights', JSON.stringify(res[1].data[values.username]));
                navigate('/home')
            } else {
                message.error('该用户不存在')
            }
            
        })
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className="loginForm-Container">
            <div className="login-part">
                <h1 className="loginForm-title">聚合支付管理系统</h1>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input placeholder="请输入用户名!" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password placeholder="请输入密码!" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    登录
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
