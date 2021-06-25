import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
Vue.use(Vuex)

// 分模块的写法
export default new Vuex.Store({
  modules: {
    home
  }
})