import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'
import store from './stores/index'
import './assets/main.css'
import './styles/index.scss'
const app = createApp(App)
app.use(router).use(store).use(Antd).mount('#app')
