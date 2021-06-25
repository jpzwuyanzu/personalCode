import Vue from 'vue'
import App from './App.vue'
import zoom from './assets/scripts/tool/zoom'

Vue.config.productionTip = false

zoom()

window.addEventListener('resize', zoom)

new Vue({
  render: h => h(App),
}).$mount('#app')
