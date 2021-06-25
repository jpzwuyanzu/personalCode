import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from 'react-redux'
import  userAction from './../store/actionCreator/user'
import { setItem } from './../utils/common'

const mapDispatchToProps = (dispatch) => {
    return {
        login(values) {
           return  dispatch(userAction(values)) //容器组件得到promise的值再返回给ui组件去处理
        }
    }
}

const Login = (props) => {

  const onFinish = (values) => {
    console.log("Success:", values);
    //在这里族谱登录异步操作，可以把异步操作放在actionCreator
    props.login(values).then(res => {
        console.log(res)
        //存储数据到本地缓存，并且跳转页面
        setItem('adminname', res.adminname)
        setItem('role', res.role)
        setItem('token', res.token)
        setItem('loginState', res.loginState)
        //判断有没有上一页，如果有则返回，没有就跳转到首页
        props.history.push('/')
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "skyblue" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Form
          style={{
            width: "360px",
            height: "420px",
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: "80px 35px",
            borderRadius:'8px'
          }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1
            style={{
              color: "#fff",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            后台管理系统
          </h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入账号!",
              },
            ]}
          >
            <Input placeholder="请输入账号" />
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
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login); //把组件改造成容器组件
