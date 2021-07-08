<template>
  <div>
    <h1>my页面--{{ count }}</h1>
  <van-button type="primary" @click="loginOut">退出登录</van-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from './../../store/'
const count = ref(100)
const route = useRoute()
const router = useRouter()
const store = useStore(key)
const loginOut = () => {
  console.log('退出登录')
  store.dispatch('loginOut')
  router.push('/home')
}
</script>

<style scoped>
</style>
