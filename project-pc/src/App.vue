<script setup lang="ts">
</script>

<template>
  <RouterView/>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
  border: none;
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
