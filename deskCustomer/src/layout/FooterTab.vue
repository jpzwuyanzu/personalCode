<template>
  <van-tabbar v-model="activeTab">
    <van-tabbar-item icon="home-o" name="home" @click="linkPage('/home/fb', false)"
      >首页</van-tabbar-item
    >
    <van-tabbar-item
      icon="video-o"
      name="sportslive"
      @click="linkPage('/sportslive', true)"
      >直播</van-tabbar-item
    >
    <van-tabbar-item
      icon="friends-o"
      name="activity"
      @click="linkPage('/activity', false)"
      >优惠</van-tabbar-item
    >
    <van-tabbar-item
      icon="setting-o"
      name="sportsbetrecord"
      @click="linkPage('/sportsbetrecord', true)"
      >注单</van-tabbar-item
    >
    <van-tabbar-item
      icon="manager-o"
      name="personal"
      @click="linkPage('/personal', false)"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAppRoute } from '@/hooks/useAppRoute'
import { usePiniaState } from "@/hooks/usePiniaState";

const { custab, loginState, common } = usePiniaState();
const {appRouter} = useAppRoute();

const activeTab = ref<string>(custab.activeTab);
const linkPage = (url: string, needLogin: boolean) => {
  //如果需要登录，但是未登录弹出登录sheet
  if(needLogin && !loginState.value) {
    common.convertLoginSheet(true)
    activeTab.value = custab.activeTab;
  } else {
    custab.switchTab(activeTab.value);
    appRouter.push(url);
  }
};
</script>
