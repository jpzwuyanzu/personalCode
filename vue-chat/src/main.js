import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import JwChat from 'jwchat';

Vue.config.productionTip = false
Vue.use(JwChat)
new Vue({
  render: h => h(App),
}).$mount('#app')
