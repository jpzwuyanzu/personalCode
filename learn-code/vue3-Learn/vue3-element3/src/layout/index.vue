<template>
  <el-container class="layout-box">
    <el-aside class="unfload">
      <SideBar/>
    </el-aside>
    <el-container>
      <el-header>
        <NavBar />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import NavBar from "layout/NavBar.vue";
import SideBar from "layout/SideBar.vue";
import AppMain from "layout/AppMain.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { Msgbox } from "element3";

const store = useStore();
const isFload = ref(store.state.isFload);
watchEffect(() => {
  isFload.value = store.state.isFload;
});
onMounted(() => {});
</script>

<style lang="scss" scoped>
.layout-box {
  position: relative;
  .unfload {
    width: auto !important;
    background-color: rgb(84, 92, 100);
  }
}
</style>
