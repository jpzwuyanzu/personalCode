<template>
    <div class="movie_detail_container">
        <MovieInfo :movieInfoData="movieInfoData"/>
        <CusPlayer/>
        <GuessLike/>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import MovieInfo from '@/components/MovieInfo.vue'
import CusPlayer from '@/components/CusPlayer.vue'
import GuessLike from '@/components/GussLike.vue'
const movieInfoData = reactive<any>({
    movieImage: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    movieDetail: {
        name: '蚁人与黄蜂女：量子狂潮',
        date: '2023',
        director: '拉里佩奇',
        mainRole: '塞缪尔·杰克逊,迈克尔·道格拉斯,伊万杰琳·莉莉,保罗·路德,乔纳森·梅杰斯,米歇尔·菲佛,比尔·默瑞,凯瑟琳·...',
        place: '美国',
        type: '喜剧',
        desc: '《蚁人3》将会深入探索量子领域这个神秘的空间，有关量子领域在以前已经做出了很好的铺垫，比如说《蚁人》中出现的量子城市、一些奇怪的生物，以及《复联4》的时空隧道等等，引入反派征服者·康，这是一位来自于未...'
    }
})
</script>
<style lang="scss">
.movie_detail_container {
    // padding: 16px;
    margin-top: 8px;
    background-color: #fff;
}
</style>