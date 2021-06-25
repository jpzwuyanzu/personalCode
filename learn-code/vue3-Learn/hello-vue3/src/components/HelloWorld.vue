<template>
<div>
  <h1>测试</h1>
<p>{{counter}}</p>
<button @click="() => {counter ++}">增加</button>
</div>
</template>

<script>
import { onMounted, ref, watch} from 'vue'

export default {
  setup(props) {
    //Number 或 String 等基本类型是通过值而非引用传递的
    // 1. 带ref的响应式变量
    const counter = ref(0)
    console.log(counter) // {value: 0}
    console.log(counter.value) // 0

    //setup内部的生命周期钩子加上on前缀
    // onMounted(/**这里可以执行对应的事件 */)

    //watch响应式的更改
    /**
     * 第一个是响应式引用或者是getter函数
     * 第二个参数是一个回调函数(newVal, oldVal)
     * 第三个一个可选配置
     */
    watch(counter, (newValue, oldValue) => {
      console.log('The new counter value is: ' + counter.value)
    })

    

  return {
    counter
  }
  }

}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
