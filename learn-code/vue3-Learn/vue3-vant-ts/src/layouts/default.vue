<template>
<div class="defaultLayout">
    <div class="pageHeader" :class="route.path === '/my/index' ? 'myPageHeader': ''">
        <div class="headerNav">
            <nav-bar/>
            <down-load-bar v-if="route.path !== '/my/index'" />
            <div class="topbar" v-if="route.path !== '/my/index'">
                <div class="leftPart">北京 <van-icon name="arrow-down" /></div>
                <div class="middlePart">
                    <van-tabs v-model="activeTab">
                        <van-tab title="热映"></van-tab>
                        <van-tab title="影院"></van-tab>
                        <van-tab title="待映"></van-tab>
                        <van-tab title="经典电影"></van-tab>
                    </van-tabs>
                </div>
                <div class="rightPart">
                    <van-icon name="search" size="20px" />
                </div>
            </div>
        </div>
    </div>
    <div class="pageContent" :class="route.path === '/my/index' ? 'myPageContent': ''">
        <router-view></router-view>
    </div>
    <div class="pageFooter">
            <van-tabbar  v-model="active" active-color="#f03d37"  :safe-area-inset-bottom="true" @change="changTabItem">
                <van-tabbar-item  v-for="item of tabRoute" :to="item.path" :key="item.path" :icon="item.icon">{{ item.title }}</van-tabbar-item>
            </van-tabbar>
    </div>
</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from 'vue'
import NavBar from './components/navBar.vue'
import DownLoadBar from './components/downLoadBar.vue'
import tabRoute from './routes'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { key } from './../store/index'
const store = useStore(key)
const route = useRoute()
const activeTab = ref(0)
const active = ref(store.state.tabChoosed)

const changTabItem = (activeItem) => {
    store.dispatch('changeTabChoose', activeItem)
}
watch(() => store.state.tabChoosed, newVal => {
    active.value = Number(store.state.tabChoosed)
})
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar__title) {
    color: #fff !important;
    font-weight: 400;
}
:deep(.van-icon-bar-chart-o) {
    color: #fff !important;
    font-size: 18px !important;
}
.defaultLayout {
   position: relative;
   width: 100%;
   height: 100%;
   overflow: hidden;
   .pageHeader {
       z-index: 1001;
       height: 150px;
       position: relative;
       .headerNav {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
           
           .topbar {
               display: flex;
               flex-direction: row;
               justify-content: space-between;
               align-items: center;
               height: 44px;
               border-bottom: 1px solid #e6e6e6;
               .leftPart {
                   padding-left: 10px;
               }
               .middlePart {
                   width: 260px;
               }
               .rightPart {
                   width: 20px;
                   height: 20px;
                   color: #f03d37;
                   padding-right: 10px;
                   .van-icon {
                       font-weight: 500px;
                   }
               }
           }
       }
   }
   .myPageHeader {
       height: 46px;
   }
   .pageContent {
       z-index: 1000;
       height: calc(100% - 200px);
       overflow:hidden;
       overflow-y: scroll;
       background-color: #f5f5f5;
       padding-right: 16px;
   }
   .myPageContent {
       height: calc(100% - 96px);
   }
   .pageFooter {
       height: 50px;
       background: #f66;
       z-index: 1001;

   }
}
</style>
