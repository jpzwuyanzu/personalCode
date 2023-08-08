import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux-hook'
import { switchTabBar } from '../../store/tabbar.slice'
import styles from './Login.module.scss'
import loginBg from '../../assets/imgs/logo.png'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [canVerify, setCanVerify] = useState(false);
    const [verifyDesc, setVerifyDesc] = useState('获取验证码');
    
    const countdownHandler = () => {
        setCanVerify(false)
		let number = 60;
		var countdown = function(){
			if (number === 0) {
                setVerifyDesc('获取验证码')
	            number = 60;
	            return;
	        } else {
	        	setVerifyDesc(number + "秒 重新发送");
	        	number--;
	        }
			setTimeout(countdown,1000);
		}
		setTimeout(countdown,1000);
	}
    const onFinish = (values: any) => {
        if(!values.phone) {
            Toast.show({
                content: '请输入手机号',
                position: 'top'
            })
        }
        if(!values.verifyCode) {
            Toast.show({
                content: '请输入验证码',
                position: 'top'
            })
        }
        if(values.phone && values.verifyCode) {
            localStorage.setItem('token', values.phone)
            navigate('/center')
        }
  }
  

    useEffect(() => {
        dispatch(switchTabBar({ status: false }))
        return () => {
          dispatch(switchTabBar({ status: true }))
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className={ styles.login_container }>
            <div className={ styles.login_bg }>
                <img className={ styles.logo } src={ loginBg } alt=""/>
            </div>
            <div className={ styles.login_Form_part }>
            <Form layout='horizontal' mode='card' className={ styles.my_form }
                name='form'
                onFinish={onFinish}
                footer={
                <>
                    <Button type='submit' block color='primary' size='middle'>
                        登录
                    </Button>
                    <div className={ styles.can_not_receive }>收不到验证码</div>
                </>
                }
            >
                <Form.Item  
                extra={<span className={ canVerify ? styles.activeVerifyCode_btn :  styles.getVerifyCode_btn } onClick={ canVerify ? countdownHandler : () => {console.log()} }>{ verifyDesc }</span>}
                name="phone"
                >
                    <Input placeholder='手机号' type="sting"  maxLength={11} clearable className={ styles.my_input } onChange={ (value: string) => {
                        value.length === 11 ? setCanVerify(true) : setCanVerify(false)
                    } } />
                </Form.Item>
                <Form.Item 
                name="verifyCode">
                     <Input placeholder='验证码' clearable className={ styles.my_input } />
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}
