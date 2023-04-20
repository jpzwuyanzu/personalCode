<template>
    <div class="movie_card_container">
        <div class="left-Label">热门电影</div>
        <div class="right-Label-container">
           <div class="label_list">
            <div class="label_item" v-for="(item, index) in labelList">{{ item.title }}</div>
           </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
const labelList = reactive([
    {
        title: '推荐',
        id: 0
    },
    {
        title: '动作',
        id: 1
    },
    {
        title: '爱情',
        id: 2
    },
    {
        title: '喜剧',
        id: 3
    },
    {
        title: '科幻',
        id: 4
    },
    {
        title: '恐怖',
        id: 5
    }
])
</script>
<style scoped lang="scss">
.movie_card_container {
    .left-Label {

    }
    .right-Label-container {
        
    }
}
</style>