<template>
    <div class="cus_player_container">
        <div id="cusDplayer"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import Dplayer from 'dplayer'
onMounted(() => {
    const dp = new Dplayer({
    container: document.getElementById('cusDplayer'),
    video: {
        url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
    },
    autoplay: true,
    hotkey: true,
    preload: 'auto',
    
 })
})
</script>
<style lang="scss">
.cus_player_container {
    padding-top: 20px;
    border-top: 1px solid #ccc;
    margin-top: 20px;
}
</style>