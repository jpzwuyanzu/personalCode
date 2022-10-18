import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress'
import { message } from 'antd'

//创建axios实例
const service = axios.create({
    // baseURL: '',
    timeout: 5000
})

//请求拦截
service.interceptors.request.use(
    (config: any) => {
        //模拟请求令牌
        config.headers['X-Token'] = 'test token'
        Nprogress.start()
        return config;
    },
    (error: any) => {
        //请求错误统一处理
        console.log(error)
        return Promise.reject(error)
    })

//响应拦截
service.interceptors.response.use(
     // 通过判断状态码统一处理响应， 根据实际情况修改，同时可以根据http状态码判断请求结果
     (response: any) => {
        const res = response.data
        if(res.code !== 0) {
            // if(res.code === 1401) {
            //     sessionStorage.clear()
            //     removeCookieItem('token')
            //     removeCookieItem('userInfo')
            //     location.href=location.origin + "/#/login"
            // }
            //在这里处理错误
            message.error(res.msg)
        } else {
            Nprogress.done()
            return res
        }
    },
    (error) => {
        console.log('error:' + error)
        return Promise.reject(error)
    }
)

export default service