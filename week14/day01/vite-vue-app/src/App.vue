<template>
  <div>
    <div class="box">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" @change="onChange">
  <van-tabbar-item icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item icon="search">分类</van-tabbar-item>
  <van-tabbar-item icon="friends-o">购物车</van-tabbar-item>
  <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Home from './views/home/index.vue'
import Kind from './views/kind/index.vue'
import Cart from './views/cart/index.vue'
import My from './views/my/index.vue'
const active = ref(0)
const router = useRouter()
const routerConfig = reactive(['/home', '/kind', '/cart', '/my'])
const onChange = (index) => {
  active.value = index
  router.push(routerConfig[index])
}
</script>

<style>

</style>
