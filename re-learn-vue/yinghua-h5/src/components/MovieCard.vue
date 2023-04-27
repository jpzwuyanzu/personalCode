<template>
    <div class="movie_card_container">
        <MovieLabel :labelList="labelList" :activeMovieLabel="activeMovieLabel" :movieLabelTitle="movieLabelTitle" @chooseLabel="chooseLabel"/>
        <div class="movie_info_list">
            <div class="movie_info_item" v-for="(item, index) in 8" @click="$router.push(`/detail/${item}`)">
                <div class="top_info">
                    <van-image
                    width="100%"
                    height="100"
                    radius="3px"
                    lazy-load
                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                </div>
                <div class="bottom_info">
                    <div>中国大陆 2022</div>
                    <div>搏击俱乐部</div>
                    <div>爱德华诺顿,</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import MovieLabel from '@/components/MovieLabel.vue'
import { ref } from 'vue'

defineProps(['movieLabelTitle', 'labelList']);
const cusEmit = defineEmits(['loadData']);

//每项卡片顶部的标签选中项
const activeMovieLabel = ref<number>(0); 
//选择每项卡片顶部标签
const chooseLabel = ({type, index}: any) => {
    activeMovieLabel.value = index
    cusEmit('loadData', { id: index,  type})
}
</script>
<style lang="scss">
.movie_card_container {
    padding: 12px;
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 24px;
    .movie_info_list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 10px;
        .movie_info_item {
            width: 80px;
            .top_info {
                border-radius: 3px;
            }
            .bottom_info {

            }
        }
    }
}
</style>