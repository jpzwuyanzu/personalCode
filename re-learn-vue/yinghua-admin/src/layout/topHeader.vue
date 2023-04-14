<template>
   <a-layout-header style="background: #fff; padding: 0">
        <div class="switchBtnGroup">
            <Icon icon="MenuUnfoldOutlined" v-if="appStore.state.sidebar.flodState"
            class="trigger"
            @click="changeCollapsed"/>
            <Icon icon="MenuFoldOutlined" v-else
            class="trigger"
            @click="changeCollapsed"/>
        </div>
      </a-layout-header>
</template>
<script setup lang="ts">
import { Icon } from './ICON'
import { useStore } from 'vuex'
const appStore = useStore()
// 切换左侧菜单显示隐藏
const changeCollapsed = () => {
    appStore.commit(`sidebar/switchflod`)
}
</script>
<style lang="scss">
    .switchBtnGroup {
        float: left;
        padding-left: 16px;
        font-size: 20px;
    }
</style>