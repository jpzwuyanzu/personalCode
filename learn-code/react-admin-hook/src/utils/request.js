import axios from 'axios'
import store from './../store'
import { message } from 'antd'
import { setItem } from './../utils/common'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const isDev = process.env.NODE_ENV === 'development';

const request = axios.create({
    baseURL : isDev ? '' : 'http://localhost:3000'
})

//设置请求拦截器
// 添加请求拦截器-------所有的数据请求都会先经过这里
request.interceptors.request.use(function (config) {
    NProgress.start()
    // 在发送请求之前做些什么-- 发送token --- 设置请求头部header
    config.headers.common.token = store.getState().getIn(['user', 'token'])
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


//设置响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done()
    if(response.data.code === '10119') {
      console.log('token失效')
      //在这里修改状态管理器和本地缓存的logiState
      store.dispatch({
        type:'CHANGE_LOGIN_STATE',
        payload:false
      })
      setItem('loginState', false)
      message.warning('token验证失败，重新登录！')
      //跳转至登录的页面
      //下边这种跳转方式和App.jsx中的效果一样，因为在这里修改了loginState，App.jsx中更具登录状态判断会自动重定向到login页面
      // setTimeout(() => {
      //   window.location.href="/login"
      // }, 1000);
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });





export default request