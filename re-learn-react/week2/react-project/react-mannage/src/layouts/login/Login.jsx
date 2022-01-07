import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
// import { loginAdmin } from './../../api/user'
import userAction from './../../store/actionCreators/user'
import { setItem } from './../../utils/common'


const mapDispatchToProps = (dispatch) => {
    return {
        loginNow(values) {
           return dispatch(userAction(values))
        }
    }
}

const Login = (props) => {
    useEffect(() => {
        notification.success({
            message: "温馨提示",
            description: "管理员：admin 密码：1234",
            duration: 0
        })
        notification.success({
            message: "温馨提示",
            description: "普通用户：normal 密码：1234",
            duration: 0
        })
    }, [])
    const onFinish = (values) => {
        // console.log('Success:', values);
        props.loginNow(values).then(res => {
            // console.log(res)
            //保存用户信息到cookie中
            setItem('adminname', res.adminname)
            setItem('role', res.roleid)
            setItem('token', res.token)
            setItem('loginState', 'true')
            props.history.push('/')
        })
      }
    
      const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
      }


    return (
        <div className="loginPage">
            <div className="loginCom">
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#fff'  }}>REACT-ADMIN</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名称"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="用户密码" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    登录
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(Login);
