import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/common.css'
import zoom from './assets/scripts/tool/zoom'
zoom()
window.addEventListener('resize', zoom)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
