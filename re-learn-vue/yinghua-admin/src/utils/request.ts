import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'ant-design-vue'

//创建axios 实例
const service = axios.create({
    // baseURL: '',
    timeout: 10000
})

// 设置axios请求拦截
//请求拦截
service.interceptors.request.use(
    (config: any) => {
        //模拟请求令牌,设置请求头部信息
        config.headers['X-Token'] = 'test token'
        Nprogress.start()
        return config;
    },
    (error: any) => {
        //请求错误统一处理
        console.log(error)
        return Promise.reject(error)
    })

//axios响应拦截
service.interceptors.response.use(
    // 通过判断状态码统一处理响应， 根据实际情况修改，同时可以根据http状态码判断请求结果
    (response: any) => {
        const res = response.data
        Nprogress.done()
        if(res.code !== 0) {
            //在这里处理错误
           if(res.code === 1001) {
            //1001代表未登录
            sessionStorage.clear()
            location.href=location.origin + "/#/login"
           }
           message.error(res.msg)
        } else {
            return res
        }
    },
    (error) => {
        console.log('error:' + error)
        return Promise.reject(error)
    }
)

export default service