<template>
  <van-tabbar v-model="activeTab">
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
import { useAppRoute } from '@/hooks/useAppRoute'
import useStore from "@/store/index";
//底部tab状态
const { custab } = useStore();
const {appRouter} = useAppRoute();
const activeTab = ref<string>(custab.activeTab);
const linkPage = (url: string) => {
  custab.switchTab(activeTab.value);
  appRouter.push(url);
};
</script>
