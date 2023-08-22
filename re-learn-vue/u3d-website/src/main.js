import { createApp } from 'vue'
import 'lib-flexible'
import router from '@/router/index'
import store from '@/store/index'
import './style.css'
import App from './App.vue'


const app = createApp(App)
app.use(router).use(store).mount('#app')
