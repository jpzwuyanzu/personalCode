<template>
    <div class="cus_player_container">
        <div id="cusDplayer"></div>
        
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import Dplayer from 'dplayer'
import IconPlay from '@/components/icons/IconPlay.vue'
import IconPause from '@/components/icons/IconPause.vue'
onMounted(() => {
    const dp = new Dplayer({
    container: document.getElementById('cusDplayer'),
    video: {
        url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        // quality: [
        //     {
        //         name: 'HD',
        //         url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        //         type: 'noomal',
        //         // type: 'hls',
        //     },
        //     {
        //         name: 'SD',
        //         url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        //         type: 'noomal'
        //     }
        // ],
        // defaultQuality: 0,
    },
    volume: 0.7,
    autoplay: true,
    hotkey: true,
    preload: 'auto',
 })
})
</script>
<style lang="scss" scoped>
.cus_player_container {
  padding-top: 20px;
  border-top: 1px solid #ccc;
  margin-top: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  #cusDplayer {
    flex: auto;
  }
}
.dplayer.dplayer-mobile
  .dplayer-controller
  .dplayer-icons
  .dplayer-full
  .dplayer-full-in-icon,
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: none !important;
}
.dplayer-controller .dplayer-icons {
  bottom: 30px !important;
}
.dplayer-controller .dplayer-bar-wrap {
  bottom: 10px !important;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-camera-icon,
.dplayer.dplayer-mobile
  .dplayer-controller
  .dplayer-icons
  .dplayer-chromecast-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-play-icon {
  display: inline-block !important;
}
.dplayer-controller .dplayer-icons .dplayer-icon {
  width: 33px !important;
}
.dplayer-controller .dplayer-icons {
  height: 33px;
}
.dplayer.dplayer-mobile .dplayer-mobile-play {
  // display: none !important;
}
</style>
