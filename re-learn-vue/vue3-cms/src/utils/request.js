import axios from 'axios'
import Nprogress from 'nprogress'
import  'nprogress/nprogress'

const isDev = process.env.NODE_ENV === 'development'

//创建axios实例
const service = axios.create({
    //请求地址前的baseUrl
    baseURL: isDev ?  '' : 'http://localhost:3000',
    timeout: 5000
})

//请求拦截
service.interceptors.request.use(
    (config) => {
        //模拟请求令牌
        config.headers['X-Token'] = 'my token';
        Nprogress.start()
        return config;
    },
    (error) => {
        //请求错误的统一处理
        console.log(error)
        return Promise.reject(error)
    }
)

//响应拦截
service.interceptors.response.use(
    /**
     * 通过判断状态码统一处理响应，根据情况修改
     * 同时也可以根据HTTP状态码判断请求结果
     */
    (response) => {
        const res = response.data
        if(res.code !== 200) {
            //在这里处理错误
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