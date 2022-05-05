<template>
  <a-layout>
    <TopHeader />
    <a-layout>
      <SideBar />
      <div class="content-container">
        <!-- 面包屑组件 -->
        <BreadCom/>
      <!-- 面包屑组件 -->
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
      </div>
    </a-layout>
  </a-layout>
</template>
<script  setup>
import SideBar from "@/layout/sideBar.vue";
import TopHeader from "@/layout/topHeader.vue";
import BreadCom from "@/layout/breadCom.vue"
import { ref } from "vue";
</script>
<style lang="scss" scoped>
.ant-layout {
  height: 100%;
}
.site-layout .site-layout-background {
  background: #fff;
}
:deep(.ant-layout-sider-children) {
  overflow: auto !important;
}
.content-container {
  display: flex;
  width: 100%;
  flex-direction: column;
}
</style>
