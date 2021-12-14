import React from "react";
import { Form, Input, Button } from "antd";
import { adminLogin } from '../api/admin'

const Login = () => {
  const onFinish = (values) => {
    adminLogin(values).then(res => {
      console.log(res)
    })
    // console.log("Success:", values);
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

export default Login;
