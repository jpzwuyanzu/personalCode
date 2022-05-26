import { createApp } from 'vue'
import App from './App.vue'
import "@/styles/index.scss"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router/index'
import store from './store/index'

createApp(App)
.use(router)
.use(store)
.use(Antd)
.mount('#app')
