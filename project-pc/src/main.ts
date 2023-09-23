import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from '@/router/index'
import pinia from '@/store/index'

pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).mount('#app')