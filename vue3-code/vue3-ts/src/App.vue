<script setup lang="ts">
import { ref } from 'vue'
const count = ref(1)
const addHandler = () => {
  count.value ++;
}
console.log(count.value)
</script>

<template>
<router-view/>
</template>

<style lang="scss"  scoped>

</style>
