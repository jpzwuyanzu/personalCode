import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev ? '' : 'http://www.test.com/api' // 如果dev模式下跨域，按照这个配置，在package.json中配置proxy字段
    // baseURL: isDev ? 'http://39.99.182.33/api' : 'http://www.test.com/api'

})

//设置拦截器
// 添加请求拦截器 --- 所有的数据请求都需要先经过这个拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 -- 发送token -- 通过头部信息

    config.defaults.headers.common.token = ''

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });




export default request