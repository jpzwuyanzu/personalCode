<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
const color = "red"
const font = {
  size: "40px"
}

onMounted(() => {
  console.log(count)
  console.log('挂载：', count)
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code class="text">css跟js变量链接起来</code>
  </p>
</template>

<style scoped>
:root {
  --varColor: yellow;
}
a {
  color: var(--varColor);
}
.text {
  color: v-bind(color);
  font-size: v-bind("font.size");
}
</style>
