import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from 'react-redux'  /// **** 添加connect
import userAction from './../store/actionCreators/user' //
import { setItem } from './../utils/common'

const mapDispatchToProps = (dispatch) => {
  return {
    login(values) {
      return dispatch(userAction(values)) 
      //这里注意要使用return， 得到的是promise对象
      //需要将promise返回给ui组件处理
    }
  }
}

const Login =  (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    props.login(values).then(res => {
      console.log(res)
      //在这里将用户信息存储到本地的cookie中
      setItem('adminname', res.adminname)
      setItem('role', res.roleid)
      setItem('token', res.token)
      setItem('loginState', 'true')

      //判断有没有上一页，没有则返回
      props.history.push('/')

    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginpage">
      <div className="loginCom">
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          username: 'admin',
          password: '123456'
        }}
      >
          <h1 style={{ textAlign:'center', marginBottom: '30px' }}>JD_ADMIN</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入账号!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);