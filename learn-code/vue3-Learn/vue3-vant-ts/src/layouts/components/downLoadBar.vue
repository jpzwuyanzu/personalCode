<template>
  <div class="download-app-bar">
    <img
      class="logo"
      src="//p0.meituan.net/scarlett/448afce485c1f342895185c2be668fa411803.png"
      alt="logo"
      width="42"
      height="42"
    />
    <a class="download-text" href="javascript:void(0)">发现最新最热电影</a>
    <span class="download-divide">｜</span>
    <a class="btn-open-custom" href="javascript:void(0)"
      >打开App<van-icon name="arrow"
    /></a>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({});
</script>
<style scoped lang="scss">
.download-app-bar {
  position: relative;
  height: 60px;
  background-color: #fff;
  width: 100%;
  z-index: 11;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  left: 0;
  top: env(safe-area-inset-top);
  border-bottom: 1px solid #e8e8e8;
  .logo {
    position: absolute;
    width: 94px;
    height: 39px;
    left: 10px;
    top: 10px;
  }
  .download-text {
    display: inline-block;
    color: #666;
    text-decoration: none;
    position: absolute;
    right: 100px;
    font-size: 14px;
  }
  .download-divide {
    position: absolute;
    right: 85px;
    opacity: 0.1;
  }
  .btn-open-custom {
    position: absolute;
    right: 8px;
    color: #b37e7e;
    text-decoration: none;
    font-size: 16px;
  }
}
</style>
