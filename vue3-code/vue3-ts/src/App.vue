<script setup lang="ts">
import { ref } from 'vue'
const count = ref(1)
const addHandler = () => {
  count.value ++;
}
console.log(count.value)
</script>

<template>
<div>{{ count }}</div>
<button @click="addHandler">+1</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
