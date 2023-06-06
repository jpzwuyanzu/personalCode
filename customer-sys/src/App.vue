<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  // import { theme } from 'ant-design-vue';
  dayjs.locale('zh-cn');
const locale = zhCN;
</script>

<!-- :theme="{
      algorithm: theme.darkAlgorithm,
    }" -->

<template>
  <a-config-provider 
  :locale="locale"
  
    :theme="{
      token: {
        colorPrimary: '#1400b9',
      },
    }"
  >
<!-- <HelloWorld/> -->
<RouterView></RouterView>
 </a-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
