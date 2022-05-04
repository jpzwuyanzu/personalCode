<template>
  <a-layout-sider v-model:collapsed="store.state.isFload" :trigger="null" collapsible style="background: #fff">
      <a-menu v-model:selectedKeys="comState.selectedMenuKeys" :open-keys="comState.openKeys"  @openChange="onOpenChange" @click="changeView"  mode="inline">
        <template v-for="(item, index) in menuData.sideMenus">
           <a-sub-menu v-if="item.children"  :key="item.path" :keypath="item.redirect">
            <template #title>
                <span>
                  <Icon :icon="item.icon" />
                  <span>{{ item.title }}</span>
                </span>
              </template>
              <a-menu-item v-for="(itm, index1) in item.children" :key="itm.path" :keypath="itm.path">{{itm.title}}</a-menu-item>
            </a-sub-menu>
            <template v-else>
              <a-menu-item :key="item.path" :keypath="item.path">
                <Icon :icon="item.icon" />
                <span>{{ item.title }}</span>
              </a-menu-item>
            </template>
        </template>
      </a-menu>
      <div class="switchSideBtn">
        <menu-unfold-outlined
                v-if="store.state.isFload"
                @click="switchSideBar"
                class="trigger"
                />
                <menu-fold-outlined
                v-else
                @click="switchSideBar"
                class="trigger"
                />
      </div>
    </a-layout-sider>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { loadSideMenu } from './model/sideMenu'
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { Icon } from './ICON'

const store = useStore()
const router = useRouter()
const route = useRoute()
const { menuData } = loadSideMenu()
const comState = reactive({
  rootSubmenuKeys: [],
  openKeys:[],
  selectedMenuKeys: [route.path]
})
menuData.sideMenus.forEach((item, index) => {
  if(item.children) {
    comState.rootSubmenuKeys.push(item.path)
  }
})
const onOpenChange = openKeys => {
  const latestOpenKey = openKeys.find(key => comState.openKeys.indexOf(key) === -1);
  if (comState.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    comState.openKeys = openKeys;
  } else {
    comState.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};
//跳转页面
const changeView= ({item, key, selectedKeys}) => {
  router.push(item.keypath)
}
//切换左侧菜单显示隐藏
const switchSideBar = () =>  {
  store.dispatch('changeFloadStateAction', !store.state.isFload)
}
</script>
<style lang="scss" scoped>
.switchSideBtn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% + 1px);
  padding-left: 24px;
  box-sizing: border-box;
  height: 48px;
  border-top: 1px solid rgba(0,0,0,.06);
  cursor: pointer;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
}
.switchSideBtn:hover {
  color: #1890FF;
}
</style>