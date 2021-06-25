import axios from 'axios'
//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router/index'
//引入路由是为了做重定向，比如没有登录过期定向到登录页面
// 创建axios实例
const instance = axios.create({
  baseURL: '', // api的base_url
  timeout: 15000,                 // 请求超时时间
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
 

// 拦截请求
instance.interceptors.request.use(config => {
  NProgress.start()
  //  可以在此处添加 token
  return config
},error => {
  return Promise.reject(error)
})
// 拦截响应
instance.interceptors.response.use(res => {
  //可以在此处拦截接口错误
  NProgress.done()
  return res}, error => {
  return Promise.reject(error)
})
export default instance