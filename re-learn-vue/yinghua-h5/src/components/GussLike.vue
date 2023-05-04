<template>
  <div class="guss_like_conytainer">
    <div class="part_title_line">猜你喜欢</div>
    <ThreeCard :cradList="gussLikeList" :isHidePagenation="true" />
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import ThreeCard from "@/components/ThreeCard.vue";
import { useFiltermovie } from "@/hooks/useFilterMovie";
defineProps(["gussLikeList"]);
const appRoute = useRoute();
const { collectChange, loadMovieData, filterParams, cusPageData } =
  useFiltermovie();
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
