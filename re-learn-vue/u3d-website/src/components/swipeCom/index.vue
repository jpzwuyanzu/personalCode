<template>
  <div class="swipeCom_container">
    <van-swipe :autoplay="3000" lazy-render>
  <van-swipe-item v-for="image in images" :key="image">
    <img class="img_item" :src="image" />
  </van-swipe-item>
</van-swipe>
  </div>
</template>

<script setup>
 const images = [
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ];
</script>

<style scoped>
.swipeCom_container {
    height: 400px;
}
.img_item {
    height: 400px;
    width: 100%;
}
</style>
