<template>
  <van-config-provider
    :theme="theme"
    style="height: 100%"
  >
    <div class="layout_container">
      <div class="layout_content">
        <RouterView />
      </div>
      <FooterTab />
    </div>
  </van-config-provider>
</template>
<script setup lang="ts">
import FooterTab from "@/layout/FooterTab.vue";
import { useTheme } from '@/hooks/useTheme';

const { theme } = useTheme();
</script>

<style lang="scss" scoped>
.layout_container {
  height: 100%;
  .layout_content {
    height: calc(100% - 50px);
  }
}
</style>
