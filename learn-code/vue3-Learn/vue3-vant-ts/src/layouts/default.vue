<template>
<div class="defaultLayout">
    <div class="pageHeader">
        <div class="headerNav">
            <nav-bar/>
            <down-load-bar/>
            <div class="topbar">
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
    <div class="pageContent">
        <router-view></router-view>
    </div>
    <div class="pageFooter">
            <van-tabbar  v-model="active" active-color="#f03d37"  :safe-area-inset-bottom="true">
                <van-tabbar-item  v-for="item of tabRoute" :to="item.path" :key="item.path" :icon="item.icon">{{ item.title }}</van-tabbar-item>
            </van-tabbar>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavBar from './components/navBar.vue'
import DownLoadBar from './components/downLoadBar.vue'
import tabRoute from './routes'
const active = ref(0)
const activeTab = ref(0)
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
   .pageContent {
       z-index: 1000;
       height: calc(100% - 200px);
       overflow:hidden;
       overflow-y: scroll;
       background-color: #f5f5f5;
       padding-right: 16px;
   }
   .pageFooter {
       height: 50px;
       background: #f66;
       z-index: 1001;

   }
}
</style>
