<template>
  <div class="navBar">
    <div class="flodbtn" @click="handleFload">
      <i v-if="!store.state.isFload" class="el-icon-s-fold"></i>
      <i v-if="store.state.isFload" class="el-icon-s-unfold"></i>
    </div>
    <BreadCrum class="breadCrum" />
    <LoginOut class="login-out" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import BreadCrum from "./BreadCrum.vue";
import LoginOut from "./loginOut.vue";

const store = useStore();

function handleFload() {
  store.dispatch("changeFloadStateAction", !store.state.isFload);
}
</script>

<style lang="scss" scoped>
.navBar {
  /* background-color: rgb(84, 92, 100); */
  height: 100%;
  // border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  .flodbtn {
    position: absolute;
    width: 25px;
    height: 25px;
    font-size: 25px;
    top: 14px;
    left: 10px;
    cursor: pointer;
  }
  .login-out {
    position: absolute;
    right: 40px;
    bottom: 10px;
  }
}
</style>
