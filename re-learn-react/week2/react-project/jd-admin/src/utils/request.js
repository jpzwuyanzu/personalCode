import axios from 'axios'
// import { getItem } from './common'
import store from './../store/index'
import { message } from 'antd'
import * as types from './../store/actionTypes'
import { setItem } from './common'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev ? '' : '' // 如果dev模式下跨域，按照这个配置，在package.json中配置proxy字段
    // baseURL: isDev ? 'http://39.99.182.33/api' : 'http://www.test.com/api'

})


// 添加请求拦截器 --- 所有的数据请求都需要先经过这个拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 -- 发送token -- 通过头部信息
    config.headers.common.token = store.getState().getIn(['user', 'token'])
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code === 10944) {
    message.warning('token验证失败，请重新登录！')
    // 当token验证失败的时候，修改登录状态为false,同时也要修改coookie中的数据
    store.dispatch({
      type: types.CHANGE_LOGINSTATE,
      payload: 'false'
    });
    setItem('loginState', 'false')
    //跳转至登录的页面，并且清掉本地缓存数据
    setTimeout(() => {
      window.location.href="/login"
    }, 1000)
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});




export default request