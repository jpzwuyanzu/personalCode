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
                <van-tab title="首页" name="home" to="/home"></van-tab>
                <van-tab title="电影" name="dianying" to="/dianying"></van-tab>
                <van-tab title="电视剧" name="dianshiju" to="/dianshiju"></van-tab>
                <van-tab title="综艺" name="zongyi" to="/zongyi"></van-tab>
                <van-tab title="动漫" name="dongman" to="/dongman"></van-tab>
                <van-tab title="伦理" name="lunli" to="/lunli"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
const activeName = ref<any>('home');
const appRoute = useRoute();
const currentRoute: any = computed(() => appRoute.name)
onMounted(() => {
    activeName.value = currentRoute.value
})

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