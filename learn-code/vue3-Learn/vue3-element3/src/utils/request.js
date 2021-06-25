import axios from 'axios'
import { Message, Msgbox } from 'element3'
import NProgress from 'nprogress'
import 'nprogress/nprogress'

const isDev = process.env.NODE_ENV === 'development'

//创建axios实例
const service = axios.create({
    //在请求的地址前面加上baseUrl
    baseURL: isDev ? '' : 'http://localhost:3000',
    timeout: 5000
});

//请求拦截
service.interceptors.request.use(
    (config) => {
        //模拟请求令牌
        config.headers['X-Token'] = 'my token';
        NProgress.start()
        return config;
    },
    (error) => {
        //请求错误统一处理
        console.log(error);
        return Promise.reject(error)
    }
)

//响应拦截
service.interceptors.response.use(
    /**
     * 通过判断状态码统一处理响应，根据情况修改
     * 同时也可以通过HTTp状态码判断请求结果
     */
    (response) => {
        const res = response.data;
        // console.log(res)

        //假设成功的状态码为200，否则是错误
        if(res.code !== 200) {
            Message.error({
                message: res.message || 'Error',
                duration: 5* 1000
            });
            // 50008: 非法令牌; 50012: 其他客户端已登入; 50014: 令牌过期;
            if(res.code === 50008 || res.code === 50012 || res.code === 50014) {
               //需要重新登录
               Msgbox.confirm("您已登出, 请重新登录", "确认", {
                confirmButtonText: "重新登录",
                cancelButtonText: "取消",
                type: "warning",
              }).then(() => {
                // store.dispatch("user/resetToken").then(() => {
                //   location.reload();
                // });
              });
            }
        } else {
            NProgress.done()
            return res
        }
    },
    (error) => {
        console.log('err' + error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5* 1000
        });
        return Promise.reject(error)
    }
)

export default service;