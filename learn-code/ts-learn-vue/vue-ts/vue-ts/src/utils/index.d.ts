
import { AxiosRequestConfig, AxiosPromise } from 'axios'

declare global {
  interface Window { // Window 不是自定义，重写的Window

    axios(config: AxiosRequestConfig): AxiosPromise

  }
}
