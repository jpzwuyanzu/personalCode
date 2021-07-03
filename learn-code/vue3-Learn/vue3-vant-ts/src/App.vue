<template>
 <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


const name = ref(123123)

</script>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
  }
</style>
