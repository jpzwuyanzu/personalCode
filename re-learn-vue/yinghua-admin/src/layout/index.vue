<template>
  <a-layout>
    <SideBar />
    <a-layout>
      <TopHeader/>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
      <!-- 路由缓存需要缓存的组件 -->
      <router-view v-slot="{ Component }" :key="$route.fullPath">
        <Transition name="slide-fade" mode="out-in" appear>
          <keep-alive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepalive"  />
          </keep-alive>
        </Transition>
        <Transition name="slide-fade" mode="out-in" appear>
          <component :is="Component" :key="$route.name" v-if="!$route.meta.keepalive" />
        </Transition>
      </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from 'vue-router'
import SideBar from "./sideBar.vue";
import TopHeader from './topHeader.vue'
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

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
  max-width: calc(100% - 80px);
  min-width: calc(100% - 200px);
  // width: calc(100% - 80px);
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


</style>
