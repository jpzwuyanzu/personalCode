<template>
    <div class="notFind">
      <img src="../assets/404.jpeg" alt="">
    </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style lang="scss" scoped>
.notFind {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  img {
    width: auto;
    display: block;
    max-height: 500px;
    margin:0 auto;
  }
}
</style>