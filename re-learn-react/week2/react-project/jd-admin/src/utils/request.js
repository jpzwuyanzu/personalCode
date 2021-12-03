import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev ? 'http://39.99.182.33/api' : 'http://www.test.com/api'

})

//设置拦截器

export default request