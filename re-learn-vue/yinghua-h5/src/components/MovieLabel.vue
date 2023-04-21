<template>
    <div class="movie_label_container">
        <div class="left-Label">{{ movieLabelTitle }}</div>
        <div class="right-Label-container">
           <div class="label_list">
            <div v-for="(item, index) in labelList" :class="{'label_item': true, 'active_item': activeMovieLabel === item.id}" @click="filterLabel(item)">{{ item.title }}</div>
           </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps(['labelList','activeMovieLabel','movieLabelTitle'])
const cusEmit = defineEmits(['chooseLabel'])

// 将当前选中的卡片标签以及具体的类型传递出去
const filterLabel = (item: any) => {
    cusEmit('chooseLabel', {'type': item.type, index: item.id})
}

</script>
<style scoped lang="scss">
.movie_label_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid rgb(238 238 238);
    .left-Label {
        color: var(--van-pink);
        font-size: 15px;
        font-weight: 500;
    }
    .right-Label-container {
        .label_list {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            .label_item {
                font-size: 13px;
                padding: 6px;
                font-weight: 500;
            }
            .active_item {
                color: #fff;
                background-color: var(--van-select-bg);
                border-radius: 8px;
            }
        }
    }
}
</style>