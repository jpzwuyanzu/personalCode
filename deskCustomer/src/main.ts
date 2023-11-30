import { createApp } from 'vue'
import 'lib-flexible'
import { ConfigProvider} from 'vant'
import 'vant/es/toast/style';
import './style.scss'
import App from './App.vue'


const app = createApp(App)

app.use(ConfigProvider)
app.mount('#app')
