<template>
    <div class="guss_like_conytainer">
       <div class="part_title_line">
        猜你喜欢
       </div>
        <ThreeCard :cusPageData="cusPageData" @collectChange="collectChange" :cradList="loadMovieData()"/>
    </div>
</template>
<script setup lang="ts">
import ThreeCard from '@/components/ThreeCard.vue'
import {useFiltermovie} from '@/hooks/useFilterMovie'
const { collectChange, loadMovieData, filterParams,  cusPageData} = useFiltermovie()
</script>
<style lang="scss" scoped>
.guss_like_conytainer {
//   padding-left: 16px;
//   padding-right: 16px;
    .part_title_line {
        padding-left: 16px;
        padding-right: 16px;
    }
}
</style>