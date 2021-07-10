import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { Button, Tabbar, TabbarItem, Swipe, SwipeItem, Image as VanImage   } from 'vant';
import 'vant/lib/index.css'; // 全局引入样式
const app = createApp(App)

console.log(import.meta.env)
app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Swipe)
app.use(SwipeItem)
app.use(VanImage)
app.use(router)
app.mount('#app')
