<template>
  <van-config-provider :theme="theme" style="height: 100%">
    <div class="layout_container">
      <div class="layout_content">
        <RouterView />
      </div>
      <!-- 底部tab组件 -->
      <FooterTab />
      <!-- 底部tab组件 -->
      <!-- 登录组件 -->
      <LoginCom/>
      <!-- 登录组件 -->
    </div>
  </van-config-provider>
</template>
<script setup lang="ts">
import FooterTab from "@/layout/FooterTab.vue";
import LoginCom from "@/components/LoginCom.vue"
import { usePiniaState } from "@/hooks/usePiniaState";

const { theme } = usePiniaState();
</script>

<style lang="scss" scoped>
.layout_container {
  height: 100%;
  .layout_content {
    height: calc(100% - 50px);
  }
}
</style>
