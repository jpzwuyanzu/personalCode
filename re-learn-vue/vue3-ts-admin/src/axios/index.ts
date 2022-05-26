// 封装axios的配置（实例化请求配置，请求拦截器，响应拦截器）及响应的方法（登录跳转，消息提示，错误处理）
import axios, { AxiosRequestConfig, Method } from 'axios'
import router from './../router/index'
import { message } from 'ant-design-vue'

/**
 * 跳转登录页面
 * 携带当前页面的路由，在登录页面完成登录之后返回当前页面
 */
const tologin = () => {
    router.replace({
        name: 'login'
    })
}