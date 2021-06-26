<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <button @click="addfn">点击事件</button>
  {{ test }}
</template>

<script setup>
import { defineProps, reactive, computed } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })

const test = computed(() => {
  return state + 100
})
const addfn = () => {
  console.log('1111')
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>