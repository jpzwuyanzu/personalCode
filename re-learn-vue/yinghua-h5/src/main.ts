import { createApp } from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from './router'
import { ConfigProvider } from 'vant'
import '@/assets/base.css'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(ConfigProvider)

app.mount('#app')
