<script setup lang="ts">
import useCounterStore from '@/store/modules/count';
import { storeToRefs } from 'pinia'
const counterStore = useCounterStore();
const { count }  =storeToRefs(counterStore)

const add = () => {
  counterStore.increment()
}


</script>

<template>
  <h1>{{ count }}</h1>
  <button @click="add">add</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
