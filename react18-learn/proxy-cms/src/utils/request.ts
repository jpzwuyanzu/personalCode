import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress'
import { message } from 'antd'
import { respMessage } from '@/utils/message'
console.log()
//创建axios实例
const service = axios.create({
    baseURL: (import.meta.env.MODE === 'test' || import.meta.env.MODE === 'production') ? import.meta.env.VITE_APP_BASE_URL : '',
    // baseURL: 'http://api.agentfff.xyz',
    timeout: 5000
})

//请求拦截
service.interceptors.request.use(
    (config: any) => {
        config.headers['satoken'] = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
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
        if(res.code !== 200) {
            if(res.code === 11012 || res.code === 11015 || res.code === 11016 || res.code === 11014) {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = window.location.origin+'/#/login'
            }
            message.open({
                type: 'error',
                content: `错误提示：${respMessage[String(res.code)]}!`,
                className: 'custom-class',
                style: {
                    // marginTop: '20vh',
                    fontSize: '20px'
                }
              })
              Nprogress.done()
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