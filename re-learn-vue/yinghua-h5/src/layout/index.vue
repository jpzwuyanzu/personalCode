<template>
  <div class="layout_container">
    <van-config-provider theme="light">
      <PageHeader />
      <div class="content-part">
        <router-view></router-view>
        <PageFooter />
      </div>
      
    </van-config-provider>
  </div>
</template>
<script setup lang="ts">
import PageHeader from "@/layout/PageHeader.vue";
import PageFooter from "@/layout/PageFooter.vue";
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: #d0d6e0;
  .content-part {
    margin-top: 24px;
    height: calc(100% - 114px);
    overflow-y: scroll;
    box-sizing: border-box;
  }
}
:deep(.van-config-provider) {
    height: 100%;
}
</style>
