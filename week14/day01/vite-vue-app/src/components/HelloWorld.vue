<template>
<div>
  <h1>{{ msg }}</h1>
<button @click="increment">计数器</button>
<div>count: {{ state.count }}</div>
<div>number: {{ number }}</div>
<div>newNum: {{ newNum }}</div>
<van-button type="primary">主要按钮</van-button>
</div>
</template>

<script setup>
import { reactive, watchEffect, watch, ref, computed, onMounted } from 'vue'

defineProps({
  msg: String
})

const number = ref(100)
const state = reactive({ count: 0 })
const increment = () => {
  state.count++
  number.value++
}

//惰性依赖
watch(() => state.count, (newVal, oldVal) => {
  console.log('newVal', newVal)
  console.log('oldVal', oldVal)
})

//立即执行
watchEffect(() => {
  console.log('count', state.count)
  console.log('number', number.value)
})

//计算属性
const newNum = computed(() => number.value * 100)

//钩子
onMounted(() => {
  number.value = 1
})
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
