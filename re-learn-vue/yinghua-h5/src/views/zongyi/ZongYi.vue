<template>
    <div class="page_container">
        <TopFilter :filterParams="filterParams" @collectChange="collectChange"/>
        <ThreeCard :cusPageData="cusPageData" @collectChange="collectChange"/>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import TopFilter from '@/components/TopFilter.vue'
import ThreeCard from '@/components/ThreeCard.vue'
const filterParams = reactive<any>({
    region: 0,
    type: 0,
    year: 0,
    sort: 0
})
const cusPageData = reactive<any>({
    currentPage: 1,
    totalItems: 100,
    showPageSize: 5,
    pageSize: 5
})
const collectChange = (type: string, params: any) => {
    if(type === 'filter') {
        console.log('过滤数据', params)
    } else {
        console.log('分页数据', params)
    }
    console.log(filterParams, cusPageData)
}
const loadMovieData = () => {
    console.log('获取电影数据')
}
</script>