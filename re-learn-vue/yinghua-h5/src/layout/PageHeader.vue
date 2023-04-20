<template>
    <div class="page_header_container">
        <div class="logo-line">
            <img class="site_logo" src="../assets/images/nunuyingyuan.png" alt="">
            <div class="searchBtn-icon">
                <van-icon name="search" />
            </div>
        </div>
        <div class="top_tab_part">
            <van-tabs v-model:active="activeName" title-active-color="#EC2D7A" title-inactive-color="#555555" line-height="2px">
                <van-tab title="首页" name="1"></van-tab>
                <van-tab title="电影" name="2"></van-tab>
                <van-tab title="电视剧" name="3"></van-tab>
                <van-tab title="综艺" name="4"></van-tab>
                <van-tab title="动漫" name="5"></van-tab>
                <van-tab title="伦理" name="6"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref('1')
</script>
<style scoped lang="scss">
.page_header_container {
    background-color: #fff;
    .logo-line {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 7px 10px;
        .site_logo {
            width: 130px;
            object-fit: contain;
        }
        .searchBtn-icon {
            position: absolute;
            right: 10px;
            font-size: 22px;
        }
    }
    .top_tab_part {
        padding: 2px 10px;
        overflow: hidden;
    }
}
</style>