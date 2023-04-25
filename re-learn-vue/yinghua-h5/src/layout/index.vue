<template>
  <div class="layout_container">
    <van-config-provider theme="light">
      <PageHeader :focusState="focusState" @switchState="switchState"/>
      <div :class="{'content-part': true,'searchContent-part': focusState}">
        <router-view></router-view>
        <PageFooter />
      </div>
    </van-config-provider>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from "@/layout/PageHeader.vue";
import PageFooter from "@/layout/PageFooter.vue";
const focusState = ref(false)
const switchState = () => {
  focusState.value = !focusState.value
}
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: rgb(234, 236, 238);
  .content-part {
    // margin-top: 24px;
    height: calc(100% - 90px);
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .searchContent-part {
    height: calc(100% - 124px);
  }
}
:deep(.van-config-provider) {
    height: 100%;
}
</style>
