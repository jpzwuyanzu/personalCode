<template>
  <div class="sideBar" :class="{ unfloadSide: !store.state.isFload }">
    <div class="side-logo">
      <img src="../assets/logo.png" alt="" />
      <span v-if="!store.state.isFload">VUE3-ELEMENT3</span>
    </div>
    <el-menu
      :unique-opened="true"
      :router="true"
      :default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="store.state.isFload"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
     
    >
    <template  v-for="(item, index) in state.sideMenus">
      <el-submenu :key="index" :index="item.redirect" v-if="item.children">
        <template #title>
          <i :class="item.icon"></i>
          <span v-if="!store.state.isFload">{{ item.title }}</span>
        </template>
        <el-menu-item-group
          v-for="(itm, index1) in item.children"
          :key="index1"
        >
          <el-menu-item :index="itm.path">{{ itm.title }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     <template v-else>
        <el-menu-item :key="index"  :index="item.path">
        <i class="el-icon-menu"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
     </template>
    </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref,  watch, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getSideMenu } from './model/sideMenu'

// const props = defineProps({
//   msg: String
// })
// const { msg } = toRefs(props)
// console.log(props['msg'])

const store = useStore();
const router = useRouter();
const route = useRoute();
const { state } = getSideMenu()

const activePath = ref(null);

function handleOpen(index, indexPath) {
  router.push(index);
  activePath.value = index;
}
function handleClose(index, indexPath) {
  router.push(index);
  activePath.value = index;
}
function handleSelect(index, indexPath) {
  activePath.value = index;
}
watch(route, (newVal, oldVal) => {
  activePath.value = newVal.path;
});
</script>

<style lang="scss" scoped>
.unfloadSide {
  width: 200px !important;
}
.sideBar {
  background-color: rgb(84, 92, 100);
  transition: width 300ms;
  -webkit-transition: width 300ms;
  .side-logo {
    height: 60px;
    display: flex;
    overflow: hidden;
    flex-direction: row;
    justify-content: center;
    border-bottom: 1px solid #635e5e;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    img {
      width: 40px;
      height: 40px;
      display: inline-block;
      margin-top: 10px;
      margin-right: 10px;
    }
    span {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      color: white;
      font-size: 14px;
    }
  }
}
</style>
