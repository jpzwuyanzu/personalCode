import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store, key } from './store/index'
import vant from 'vant'
import 'vant/lib/index.css' //全局引入样式
import 'lib-flexible'


createApp(App)
.use(router)
.use(store, key)
.use(vant)
.mount('#app')
