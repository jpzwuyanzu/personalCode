<template>
    <div>
      <h1> fb体育</h1>
      <!-- <van-button type="primary">主要按钮</van-button> -->
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const appRouter = useRouter()
const linkpage = (url: string) => {
    appRouter.push(url)
}
</script>
<style lang="scss" scoped>
h1 {
    font-size: 20px;
    text-align: center;
}
</style>