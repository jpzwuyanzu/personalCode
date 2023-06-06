<template>
  <a-layout>
      <a-layout-sider :style="siderStyle">左侧联系人列表</a-layout-sider>
      <a-layout>
        <a-layout-header :style="headerStyle">头部信息</a-layout-header>
        <a-layout-content :style="contentStyle">
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
        <a-layout-footer :style="footerStyle">底部信息</a-layout-footer>
      </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
// import { ref } from "vue";
// import { useRoute } from 'vue-router'
// import SideBar from "./sideBar.vue";
import type { CSSProperties } from 'vue';
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
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
