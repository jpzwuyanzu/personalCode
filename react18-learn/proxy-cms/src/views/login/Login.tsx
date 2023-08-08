import React from 'react';
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { respMessage } from '@/utils/message'
import { useAppDispatch } from './../../hooks/hooks'
import { loginSys } from './../../store/slices/user.slice'
import MD5 from 'md5'
import styles from './Login.module.scss'
import LogoImg from './../../assets/logo.png'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const userToken = useAppSelector((state) => state.user.token)
  // useEffect(() => {
  //   if(userToken) {
  //     navigate(-1)
  //   }
  // }, [pathname])
  const onFinish = async (values: any) => {
    if(values) {
      const resp: any = await dispatch(loginSys({username: values.username, password: MD5(values.password)}))
      if(resp && resp.payload && resp.payload.code) {
        if(resp.payload.code === 200) {
          // 登录成功
          message.open({
            type: 'success',
            content: resp.payload.msg
          });
          navigate('/')
        } else {
          message.open({
            type: 'error',
            content: respMessage[String(resp.payload.code)]
          });
        }
        
      }
    }
  };

  return (
    <div className={ styles.loginCom_container }>
      <div className={ styles.loginCom }>
      <img className={ styles.logo_img } src={ LogoImg } alt="" />
      <div className={styles.Login_title}>代理充值系统</div>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input className={ styles.loginCom_input } prefix={<UserOutlined className={ styles.site_form_item_icon } />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        
         <Input.Password
          placeholder="密码"
          prefix={<LockOutlined className={ styles.site_form_item_icon } />}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className={ styles.loginCom_input }
        />
      </Form.Item>
      <Form.Item
        name="googleCode"
        rules={[{ required: true, message: '请输入谷歌验证码!' }]}
      >
        <Input
          prefix={<LockOutlined className={ styles.site_form_item_icon } />}
          type="password"
          placeholder="谷歌验证码"
          className={ styles.loginCom_input }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.login_form_button}>
          登录
        </Button>
      </Form.Item>
    </Form>
      </div>
    </div>
  );
};

export default Login;