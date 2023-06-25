import { createApp } from 'vue'
import 'lib-flexible'
import { ConfigProvider, ActionSheet, Toast } from 'vant'
import 'vant/es/toast/style';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router/index'
import './style.scss'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)

app.use(ConfigProvider)
app.use(ActionSheet)
app.use(Toast)
app.use(router)
app.use(pinia)
app.mount('#app')
