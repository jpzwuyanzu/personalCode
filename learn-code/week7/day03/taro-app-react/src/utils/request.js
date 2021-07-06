import Taro from '@tarojs/taro'
const baseUrl ="http://localhost:3000"
export default {
  get (url, data, header) {
    Taro.showLoading()
    return new Promise((resolve, reject) => {
      Taro.request({
        url: baseUrl + url,
        data: data || {},
        // mode: 'no-cors',
        method: 'GET',
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          reject()
        },
        complete: () => {
          Taro.hideLoading()
        }
      })
    }).catch((e) => {})

  },
  post (url, data, header) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: baseUrl + url,
        data: data || {},
        mode: 'no-cors',
        method: 'POST',
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          reject()
        },
        complete: () => {
          Taro.hideLoading()
        }
      })
    }).catch((e) => {})
  }
}