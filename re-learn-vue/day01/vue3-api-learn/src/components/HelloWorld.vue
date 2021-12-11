<script setup>
import { ref, reactive } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
const obj = reactive({ count: 0 })
console.log(count)
console.log(obj)




</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <button type="button" @click="count++">count is: {{ count }}</button>
    <br/>
    <div>{{ obj.count }}</div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
