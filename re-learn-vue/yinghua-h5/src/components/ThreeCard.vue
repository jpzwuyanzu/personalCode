<template>
    <div class="three_card_container">
        <!-- 搜索页面的搜索结果条数 -->
        <div v-if="$route.name === 'search'" class="search_result_count">搜索“{{ $route.query.query }}”相关搜索结果如下:</div>
       <div class="movie_list">
        <div class="movie_item" v-for="item in cradList" @click="$router.push(`/detail/${item}`)">
            <div class="top_info">
                <van-image
                    width="100%"
                    height="130"
                    radius="3px"
                    lazy-load
                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
            </div>
            <div class="desc">中国大陆 2023 科幻电影</div>
            <div class="movie_tit">大海怪</div>
            <div class="desc">刘德华，吴京，李雪健</div>
        </div>
       </div>
       <!-- 分页组件 -->
       <div class="cus_pageContainer">
        <van-pagination v-model="cusPageData.currentPage" :total-items="cusPageData.totalItems" :force-ellipses="true" :show-page-size="cusPageData.showPageSize" :items-per-page="cusPageData.pageSize" @change="switchPage">
            <template #prev-text>
                <van-icon name="arrow-left" />
            </template>
            <template #next-text>
                <van-icon name="arrow" />
            </template>
            <template #page="{ text }">{{ text }}</template>
            </van-pagination>
       </div>
       <!-- 分页组件 -->
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
defineProps(['cusPageData', 'cradList'])
const $emit = defineEmits(['collectChange'])
const switchPage = (page: number) => {
    console.log(page)
    $emit('collectChange', '', { currentPage: page })
}

</script>
<style lang="scss">
    .three_card_container {
        background-color: #fff;
        padding-top: 24px;
        padding-bottom: 30px;
        .search_result_count {
            margin-left: 16px;
            margin-right: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 10px;
            font-weight: 700;
            font-size: 17px;
            color: #EC2D7A;
        }
        .movie_list {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-left: 16px;
            padding-right: 16px;
            .movie_item {
                width: 106px;
                .top_info {
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .desc {
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    text-align: center;
                    color: #A6A6A6;
                    font-weight: 500;
                    font-size: 13px;
                }
                .movie_tit {
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                    color: #555555;
                }
            }
        }
        .cus_pageContainer {
            padding: 25px;
        }
    }
</style>