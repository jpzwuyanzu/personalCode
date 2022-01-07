import axios from 'axios'
// import { getItem } from './common'
import store from './../store/index'
import { message } from 'antd'
import * as types from './../store/actionTypes'
import { setItem } from './common'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev ? '' : 'http://www.test.com/api' // 如果dev模式下跨域，按照这个配置，在package.json中配置proxy字段
    // baseURL: isDev ? 'http://39.99.182.33/api' : 'http://www.test.com/api'

})


// 添加请求拦截器 --- 所有的数据请求都需要先经过这个拦截器
request.interceptors.request.use(function (config) {
    // console.log('config', config)
    NProgress.start()
    // 在发送请求之前做些什么 -- 发送token -- 通过头部信息
    config.headers.common.token = store.getState().getIn(['user', 'token'])
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  NProgress.done()
  // 对响应数据做点什么
  if(response.data.code === '1002') { //假设该code代表token验证失败，会重新登录
    message.warning('token验证失败，请重新登录!')
    store.dispatch({
      type: types.CHANGE_LOGIN_STATE,
      payload: 'false'
    })
    setItem('loginState', 'false')
    //下边的跳转方式和在App.jsx中的路由判断效果一致，这里修改了登录的状态，在App.jsx中会根据状态判断直接跳转到login页面
    // setTimeout(() => {
    //   window.location.href = '/login'
    // }, 1000)
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});




export default request