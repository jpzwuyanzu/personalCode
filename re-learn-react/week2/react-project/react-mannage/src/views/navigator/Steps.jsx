/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { Steps, Button, Form, Input } from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: '步骤一',
    content: 'First-content',
  },
  {
    title: '步骤二',
    content: 'Second-content',
  },
  {
    title: '步骤三',
    content: 'Last-content',
  },
];

const StepsCom = () => {

    const [current, setCurrent] = useState(0);
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [nextFlag, setNextFlag] = useState(false)

    const telReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

    const handlerPhone = (e) => {
        if(telReg.test(e.target.value)) {
            setPhone(e.target.value)
            setNextFlag(true)
        } else {
            setNextFlag(false)
        } 
    }

    const emailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/

    const handlerEmail = (e) => {
        if(emailReg.test(e.target.value)) {
            setEmail(e.target.value)
            setNextFlag(true)
        } else {
            setNextFlag(false)
        } 
    }

    const passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const handlerPass = (e) => {
        if(passReg.test(e.target.value)) {
            setPass(e.target.value)
            setNextFlag(true)
        } else {
            setNextFlag(false)
        } 
    }

    const next = () => {
        setCurrent(current + 1);
        setNextFlag(false)
    }
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    //   }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      }
    const submitData = () => {
        const params = {
            'phone': phone,
            'email': email,
            'pass': pass
        }
        console.log(params)
        //在这里请求接口
    }


    return (
        <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
    //   onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ marginTop: '30px' }}
    >
      {
          current === 0 && (
              <>
            <Form.Item
                label="手机号码"
                name="phone"
                rules={[{ required: true, message: '请输入你的手机号!' }]}
                >
                <Input onChange={ handlerPhone } placeholder="请输入正确的手机号码" maxLength={ 11 } />
            </Form.Item>
            {
                nextFlag && (
                    <Button type="primary" onClick={() => next()}>
                    下一步
                    </Button>
                )
            }
              </>
          )
      }
      {
          current === 1 && (
              <>
                <Form.Item
                label="邮箱账号"
                name="email"
                rules={[{ required: true, message: '请输入你的邮箱账号!' }]}
                >
                <Input onChange={ handlerEmail } placeholder="请输入正确的邮箱账号" />
                </Form.Item>
                {
                    nextFlag && (
                        <Button type="primary"  onClick={() => next()}>
                        下一步
                        </Button>
                    )
                }
              </>
          )
      }
      {
          current === 2 && (
            <>
                <Form.Item
                label="密码"
                name="pass"
                rules={[{ required: true, message: '请输入你的密码!' }]}
                >
                <Input.Password onChange={ handlerPass } placeholder="至少8个字符，至少一个字母和一个字符" />
                </Form.Item>
                {
                    nextFlag && (
                        <Button type="primary" htmlType="submit" onClick={ submitData }>
                        注册
                        </Button>
                    )
                }
            </>
          )
      }
    </Form>
    </>
    );
}

export default StepsCom;
