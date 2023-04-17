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
/**
 * 自定义全局指令,防止用户重复提交数据
 */

app.directive('preventReClick', {
    mounted(el, binding) {
        el.addEventListener('click', () => {
            if(!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 1000) 
            }
        })
    }
})

app.use(router).use(store).use(Antd).mount('#app')

