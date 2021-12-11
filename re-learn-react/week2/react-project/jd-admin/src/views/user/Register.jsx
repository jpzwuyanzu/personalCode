import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Steps } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "第一步",
    content: "输入手机号",
  },
  {
    title: "第二步",
    content: "输入验证码",
  },
  {
    title: "第三步",
    content: "输入密码",
  },
];

const Register = () => {
  const [myForm] = Form.useForm();
  const [flag, setFlag] = useState(true);
  const [text, setText] = useState('发送短信验证码')
  //步骤条
  const [current, setCurrent] = React.useState(0);
  const [phone, setPhone] = useState('')
  const [telcode, setTelCode] = useState('')
  const [pass, setPass] = useState('')
  const [phoneflag, setPhoneFlag] = useState(false)
  const [telcodeFlag, setTelCodFlag] = useState(false)
  const [passflag, setPassFlag] = useState(false)


  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  const handlerPhone = (e) => {
    //   console.log(e.target.value)
    //在这里正则验证手机号
    if(phoneReg.test(e.target.value)) {
        setFlag(false) 
        setPhone(e.target.value)
        setPhoneFlag(true)
    } else {
        setFlag(true)
    }
  };

  const sendCode = (values) => {
    // console.log(myForm.getFieldValue());
    let timer = null
    let time = 10
    timer = setInterval(() => {
        time -- 
        setText(time + 's后重新发送')
        setFlag(true)
        if(time <= 0) {
            clearInterval(timer)
            setText('发送短信验证码')
            setFlag(false)
            time = 10
        }
    }, 1000)
  };

  const handlerTelCode = (e) => {
    //   console.log(e.target.value)
      setTelCode(e.target.value)
      setTelCodFlag(true)
  }

  const handlerPass = (e) => {
    //   console.log(e.target.value)
      setPass(e.target.value)
      setPassFlag(true)
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const submitForm = (e) => {
    console.log('phone:', phone, 'telcode:', telcode, 'pass:', pass)
  }

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        form={myForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginTop: '40px' }}
      >
        {current === 0 && (
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号!" }]}
          >
            <Row>
              <Col span={24}>
                <Input maxLength={11} onChange={handlerPhone} />
                {phoneflag && (
                <Button type="primary" style={{ marginTop: '30px' }} onClick={() => next()}>
                    下一步
                </Button>
                )}
              </Col>
            </Row>
          </Form.Item>
        )}
        {current === 1 && (
          <Form.Item
            label="手机验证码"
            name="telcode"
            rules={[{ required: true, message: "请输入手机验证码!" }]}
          >
            <Row>
              <Col span={16}>
                <Input onChange={ handlerTelCode } />
              </Col>
              <Col span={8}>
                <Button type="primary"  onClick={sendCode} disabled={flag}>
                  { text }
                </Button>
              </Col>
              {telcodeFlag && (
                <Button type="primary" style={{ marginTop: '30px' }} onClick={() => next()}>
                    下一步
                </Button>
                )}
            </Row>
          </Form.Item>
        )}

        {current === 2 && (
          <>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Row>
                <Col span={24}>
                  <Input.Password onChange={ handlerPass } />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            {passflag && (
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={ submitForm }
                >
                    注册
                </Button>
            )}
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

export default Register;
