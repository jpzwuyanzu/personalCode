<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" name="home" @click="linkPage('/home/fb')"
      >首页</van-tabbar-item
    >
    <van-tabbar-item
      icon="video-o"
      name="sportslive"
      @click="linkPage('/sportslive')"
      >直播</van-tabbar-item
    >
    <van-tabbar-item
      icon="friends-o"
      name="activity"
      @click="linkPage('/activity')"
      >优惠</van-tabbar-item
    >
    <van-tabbar-item
      icon="setting-o"
      name="sportsbetrecord"
      @click="linkPage('/sportsbetrecord')"
      >注单</van-tabbar-item
    >
    <van-tabbar-item
      icon="manager-o"
      name="personal"
      @click="linkPage('/personal')"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store/index";
const { custab } = useStore();
const active = ref<string>(custab.activeTab);

const appRouter = useRouter();
const linkPage = (url: string) => {
  custab.switchTab(active.value);
  appRouter.push(url);
};
</script>
