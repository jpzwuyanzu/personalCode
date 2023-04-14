<template>
  <a-layout-sider
    v-model:collapsed="appStore.state.sidebar.flodState"
    :trigger="null"
    collapsible
  >
    <div class="logo">
      <img src="../assets/images/siteLogo.svg" alt="" />
      <span v-show="!appStore.state.sidebar.flodState">ant Design Vue</span>
    </div>
    <!-- 这里的 :open-keys="cusState.openKeys" 必须使用横杠连接，否则不生效-->
    <a-menu
      v-model:selectedKeys="cusState.selectedKeys"
      :open-keys="cusState.openKeys"
      theme="dark"
      @openChange="onOpenChange"
      @click="changeView"
      mode="inline"
    >
      <template v-for="(item, index) in sideMenu">
        <a-sub-menu
          v-if="item.children"
          :key="item.path"
          :keypath="item.redirect"
        >
          <template #icon>
            <Icon :icon="item.icon" />
          </template>
          <template #title>{{ item.title }}</template>
          <a-menu-item
            v-for="(item1, index1) in item.children"
            :key="item1.path"
            :keypath="item1.path"
            >{{ item1.title }}</a-menu-item
          >
        </a-sub-menu>
        <template v-else>
          <a-menu-item :key="item.path" :keypath="item.path">
            <Icon :icon="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import { Icon } from './ICON'
import { useRouter, useRoute } from "vue-router";
import { loadSideMenu } from "./model/sideMenu";
import { key } from "../../../../learn-code/week13/vue3-ts-app/src/store/index";
const appStore = useStore();
const appRouter = useRouter();
const appRoute = useRoute();
const { sideMenu } = loadSideMenu();
const cusState = reactive<any>({
  rootSubmenuKeys: [],
  openKeys: [],
  selectedKeys: [appRoute.path],
});

//监听当前路由，如果选择的是默认首页，关闭其他所有菜单
const checkedPath = computed(() => {
  return appRoute.path + "";
});
watch(checkedPath, (newVal, oldVal) => {
  cusState.selectedKeys = [newVal];
  if(newVal === '/home') {
    cusState.openKeys = []
  }
});
//点击菜单收起其他菜单，保持菜单简洁
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey: any = openKeys.find((key: any) => cusState.openKeys.indexOf(key) === -1);
  if (cusState.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    cusState.openKeys = openKeys;
  } else {
    cusState.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};
//点击左侧导航
const changeView = ({ item }: any) => {
  appRouter.push(item.keypath);
};
//初始化
onMounted(() => {
  sideMenu.forEach((item) => {
    if (item.children) {
      cusState.rootSubmenuKeys.push(item.path);
    }
  });
  cusState.openKeys = [`/${appRoute.path.split("/")[1]}`];
});
</script>
<style lang="scss">
.logo {
  height: 32px;
  margin: 16px;
  //   background: rgba(52, 52, 52, 0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    margin-right: 5px;
  }
  span {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
