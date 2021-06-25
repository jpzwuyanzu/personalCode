import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import { AxiosRequestConfig, AxiosPromise } from 'axios'
import axios from './utils/axios'

declare global {
  interface Window { // Window 不是自定义，重写的Window
    axios(config: AxiosRequestConfig): AxiosPromise<any>

  }
}
window.axios = axios

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
