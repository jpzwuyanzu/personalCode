import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    //当本地访问开发环境跨域的时候，按照这个配置
    // 同时在package.json中配置proxy字段
    // baseURL: isDev ? '' : 'http://wwww.product/api' 
    baseURL: isDev ? 'http://www.development/api' : 'http://wwww.product/api'
})

export default request
