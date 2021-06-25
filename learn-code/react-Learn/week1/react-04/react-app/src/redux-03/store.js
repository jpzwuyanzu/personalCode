import { createStore } from 'redux'


import reducer from './reducer'

const store = createStore(reducer)

export default store
/**
 * 如果需要获取状态  store.getState()
 * 如果需要订阅更新视图  store.subscribe(fn)  fn是关键  (状态/属性的改变会导致视图的二次渲染 ---- 入口文件)
 * 如果需要触发更改状态 this.$store.dispatch({type:''});
 * 
 */