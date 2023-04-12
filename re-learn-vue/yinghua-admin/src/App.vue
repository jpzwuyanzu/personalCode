<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');
const locale = zhCN;
</script>

<template>
<a-config-provider :locale="locale">
<router-view></router-view>
 </a-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
  width: 100%;
}
/*进度条*/
#nprogress {
  position: fixed;
  top: 0px;
  width: 100%;
}
#nprogress .bar {
  height: 3px;
  background: #1890ff;
  z-index: 1000;
}

#nprogress .peg {
  box-shadow: 0 0 10px #fe9600, 0 0 5px #fe9600;
}
  :deep(.ant-drawer-content-wrapper) {
  width: 400px !important;
}
</style>
