<template>
    <div class="movie_detail_container">
        <MovieInfo/>
        <CusPlayer/>
        <GuessLike/>
    </div>
</template>
<script setup lang="ts">
import MovieInfo from '@/components/MovieInfo.vue'
import CusPlayer from '@/components/CusPlayer.vue'
import GuessLike from '@/components/GussLike.vue'
</script>
<style lang="scss">
.movie_detail_container {
    padding: 16px;
    margin-top: 8px;
    background-color: #fff;
}
</style>