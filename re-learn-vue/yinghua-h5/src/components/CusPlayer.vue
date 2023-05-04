<template>
  <div class="cusPlayer_com">
    <div class="cus_player_container">
      <div id="cusDplayer"></div>
    </div>
    <div class="bottom_resource">
      <div
        :class="{
          resource_item: true,
          active_resource_item: activeResource === index,
        }"
        v-for="(item, index) in playerInfo['resourceList']"
        @click="chooseDiffResource(index, 0)"
      >
        {{ (item as any)["name"] }}
      </div>
    </div>
    <div class="resource_line_container">
      <div
        :class="{
          line_item: true,
          active_line_item: activeCollection === index,
        }"
        v-for="(item, index) in playerInfo['resourceList'][activeResource][
          'collection'
        ]"
        @click="chooseDiffResource(activeResource, index)"
      >
        {{ (item as any)["name"] }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import "xgplayer/dist/index.min.css";
import { onMounted, ref, watch } from "vue";
import Player from "xgplayer";
const props = defineProps(["playerInfo"]);
//默认选中第0个resource
const activeResource = ref(0);
//默认选中第0个collection
const activeCollection = ref(0);
const player = ref<any>(null);
//创建播放器实例
const createPlayer = (resIndex: any, collIndex: any) => {
  player.value = new Player({
    id: "cusDplayer",
    autoplay: true,
    volume: 0.3,
    url: props.playerInfo["resourceList"][resIndex]["collection"][collIndex][
      "videoUrl"
    ],
    poster:
      props.playerInfo["resourceList"][resIndex]["collection"][collIndex][
        "posterUrl"
      ],
    playsinline: true,
    width: document.getElementById("cus_player_container")?.style.width,
    height: document.getElementById("cus_player_container")?.style.height,
  });
  // player.emit('resourceReady', [{ name: '超清', url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4' }, { name: '高清', url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-480p.mp4' }, { name: '标清', url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4' }]);
};
//销毁播放器实例
const destroyPlayer = () => {
  player.value && player.value.destroy();
};
//切换资源以及切换具体集数
const chooseDiffResource = (reIndex: any, collIndex: any) => {
  activeResource.value = reIndex;
  activeCollection.value = collIndex;
};
watch(
  [activeResource, activeCollection],
  ([newActiveResource, newActiveCollection]) => {
    destroyPlayer();
    createPlayer(newActiveResource, newActiveCollection);
  }
);

onMounted(() => {
  destroyPlayer();
  createPlayer(activeResource.value, activeCollection.value);
});
</script>
<style lang="scss" scoped>
.cusPlayer_com {
  margin-top: 20px;
  margin-bottom: 20px;
  border-top: 1px solid #ccc;
  padding-left: 16px;
  padding-right: 16px;
  .cus_player_container {
    padding-top: 20px;

    width: 100%;
    height: 400px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    #cusDplayer {
      width: 100%;
      height: 100%;
      flex: auto;
    }
  }
  .bottom_resource {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ccc;
    .resource_item {
      width: 25%;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
      font-size: 15px;
    }
    .active_resource_item {
      background-color: #555555;
      border-radius: 4px;
      color: #fff;
      font-weight: 500;
    }
  }
  .resource_line_container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 8px;
    .line_item {
      width: 25%;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
      font-size: 15px;
    }
    .active_line_item {
      background-color: #f87171;
      border-radius: 4px;
      color: #fff;
      font-weight: 500;
    }
  }
}
</style>
