import { createApp } from 'vue'
import "@/styles/index.scss"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from '@/router'
import store from '@/store'


createApp(App)
.use(Antd)
.use(router)
.use(store)
.mount('#app')
