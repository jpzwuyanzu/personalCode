import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
  baseURL: isDev ? '' : 'http://localhost:3000'
})

//  设置拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

request.interceptors.response.use((response: AxiosResponse<any>) => {
  return response
}, err => {
  return Promise.reject(err)
})

export default request
