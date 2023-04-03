import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//定义错误处理配置
app.config.errorHandler = (err) => {
    /**处理错误 */
}
//定义全局属性
app.config.globalProperties.msg = 'test property';