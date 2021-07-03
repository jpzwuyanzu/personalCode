<template>
  <h1>my页面--{{ count }}</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(100)
</script>

<style scoped>
</style>
