import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    //当本地访问开发环境跨域的时候，按照这个配置
    // 同时在package.json中配置proxy字段
    baseURL: isDev ? '' : 'http://wwww.product/api' 
    // baseURL: isDev ? 'http://www.development/api' : 'http://wwww.product/api'
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
