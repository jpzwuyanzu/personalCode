<template>
    <div class="page_container">
        <!-- <TopFilter :filterParams="filterParams" @collectChange="collectChange"/> -->
        <ThreeCard :cusPageData="cusPageData" @collectChange="collectChange" class="search_margin"/>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import TopFilter from '@/components/TopFilter.vue'
import ThreeCard from '@/components/ThreeCard.vue'
import {useFiltermovie} from '@/hooks/useFilterMovie'
const { collectChange, loadMovieData, filterParams,  cusPageData} = useFiltermovie()
// const appRouter = useRouter();
// const filterParams = reactive<any>({
//     region: 0,
//     type: 0,
//     year: 0,
//     sort: 0
// })
// const cusPageData = reactive<any>({
//     currentPage: 1,
//     totalItems: 100,
//     showPageSize: 5,
//     pageSize: 5
// })
// const filterMeter = ref<string>('');
// const collectChange = (type: string, params: any) => {
//     if(type === 'filter') {
//         console.log('过滤数据', params)
//     } else {
//         console.log('分页数据', params)
//     }
//     console.log(filterParams, cusPageData)
//     filterMeter.value = `?region=${filterParams.region}&type=${filterParams.type}&year=${filterParams.year}&sort=${filterParams.sort}&page=${cusPageData.currentPage}`
//     appRouter.push(`/dianying${filterMeter.value}`)
// }
// const loadMovieData = () => {
//     console.log('获取电影数据',filterMeter.value)
// }
</script>
<style lang="scss" scoped>
.search_margin {
    margin-top: 24px;
}
</style>