import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { connect } from "react-redux";
import userAction from "./../store/actionCreator/user";
import { setItem } from "./../utils/common";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";

const mapDispatchToProps = (dispatch) => {
  return {
    loginNow(values) {
      //在这里触发actionCreator
      return dispatch(userAction(values));
    },
  };
};

const Login = (props) => {

  useEffect(() => {
    notification.open({
      message: '提示',
      description:
        '账号为admin或者是visitor，密码随意！',
      onClick: () => {
        console.log('Notification Clicked!');
      }
    })
  }, [])
  

  const onFinish = (values) => {
    // console.log("Success:", values);
    //在这里登录
    props.loginNow(values).then((result) => {
      // 在这里将获取到的用户信息本地缓存一份
      setItem("adminName", result.userName);
      setItem("role", result.role);
      setItem("token",result.token)
      setItem("loginState", true);
      props.history.push('/')
    });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginPage">
      <div className="loginCom">
        <Form
          className="loginForm"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1 className="comTitle">后台管理系统</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入账号!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon-login" />}
              placeholder="请输入账号"
            />
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon-login" />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="loginBtn"
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);
