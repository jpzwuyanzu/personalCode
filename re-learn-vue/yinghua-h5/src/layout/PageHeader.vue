<template>
    <div class="page_header_container">
        <div class="logo-line">
            <img class="site_logo" src="../assets/images/nunuyingyuan.png" alt="" @click="appRouter.push('/home')">
            <div class="searchBtn-icon" @click="showSearchInput">
                <van-icon v-if="focusState" name="cross" />
                <van-icon v-else name="search" />
            </div>
        </div>
        <transition name="slide-fade">
            <div v-if="focusState" class="top_search_part">
            <van-search class="cusSearch" v-model="searchParams" placeholder="搜索电影、电视剧、综艺、动漫" />
            <div class="search-button" @click="searchNow">
                <van-icon name="search" />
            </div>
            </div>
        </transition>
        <div v-if="$route.name === 'search' || $route.name === 'detail'" class="top_tab_part_copy">
            <div class="part_item" @click="linkPage('/')">首页</div>
            <div class="part_item" @click="linkPage('/dianying')">电影</div>
            <div class="part_item" @click="linkPage('/dianshiju')">电视剧</div>
            <div class="part_item" @click="linkPage('/zongyi')">综艺</div>
            <div class="part_item" @click="linkPage('/dongman')">动漫</div>
            <div class="part_item" @click="linkPage('/lunli')">伦理</div>
        </div>
        <div v-else class="top_tab_part">
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
import { useRoute,useRouter } from 'vue-router'
defineProps(['focusState'])
const $emit = defineEmits(['switchState'])
const searchParams = ref<string>('')
const activeName = ref<any>('home');
const appRoute: any = useRoute();
const appRouter = useRouter();
const currentRoute: any = computed(() => appRoute.name)
const showSearchInput = () => {
    searchParams.value = ''
    $emit('switchState')
}
const searchNow = () => {
    if(searchParams.value.length) {
        appRouter.push(`/search?query=${searchParams.value}`)
    }
}
const linkPage = (url: any) => {
    appRouter.push(url)
}
watch(appRoute, (newVal: any) => {
    console.log(newVal.name)
        activeName.value = newVal.name
})
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
            color: #555;
        }
    }
    .top_search_part {
        height: 34px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        // border: 1px solid #ccc;
        box-shadow: 0px 1px 1px #d8d1d1;
        border-radius: 10px;
        .cusSearch {
            flex: 1;
        }
        .search-button {
            width: 30px;
            height: 34px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 23px;
            background-color: #EC2D72;
            color: #ffffff;
        }
    }
    .top_tab_part {
        padding: 2px 10px;
        overflow: hidden;
    }
    .top_tab_part_copy {
        padding: 2px 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 48px;
        box-sizing: border-box;
        overflow: hidden;
        .part_item {
            height: 48px;
            white-space: nowrap;
            text-align: center;
            line-height: 48px;
            font-size:15px;
            padding-left: 8px;
            padding-right: 8px;
            font-weight: 500;
            color: #555555;
        }
    }
}
:deep(.van-search) {
    padding: 0px !important;
}
:deep(.van-search__content) {
    background-color: #fff;
}
:deep(.van-field__control::placeholder) {
    color: #A6A6A6;
}
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>