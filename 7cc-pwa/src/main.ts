import { createApp } from 'vue'
import 'lib-flexible'
import { ConfigProvider } from 'vant'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router/index'
import './style.css'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)

app.use(ConfigProvider)
app.use(router)
app.use(pinia)
app.mount('#app')
