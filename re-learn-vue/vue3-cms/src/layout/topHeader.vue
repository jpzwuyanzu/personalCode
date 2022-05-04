<template>
    <a-layout-header style="background: #001529; padding: 0">
        <div class="header-left-part">
             <div class="admin-logo">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="">
                <h1>VUE3-Antd</h1>
            </div>
        </div>
      </a-layout-header>
</template>
<script setup>
import { ref } from 'vue'
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
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
.header-left-part {
    width: 200px;
    text-align: center;
    .admin-logo {
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  float: left;
  
  img{
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
  h1 {
    color: #fff;
    height: 64px;
    font-weight: 600;
    font-size: 18px;
    line-height: 64px;
    padding: 0;
    margin: 0;
    margin-left: 12px;
  }
}
}
</style>