<template>
 <DefaultLayout></DefaultLayout>
  
</template>

<script lang="ts" setup>
import DefaultLayout from './layouts/default.vue'
import { ref } from 'vue'


const name = ref(123123)

</script>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
  }
</style>
