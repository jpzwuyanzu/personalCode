<template>
  <div class="topFilter_container">
    <div class="filter_title">影视筛选</div>
    <div class="filter_group">
      <div class="filter_item">
        <div class="filter_label">地区：</div>
        <div class="filter_type">
          <van-tabs v-model:active="activePlace" line-height="0" shrink title-inactive-color="#334115" title-active-color="#fff">
            <van-tab v-for="(item, index) in filterOptions.place" :title="item"></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="filter_item">
        <div class="filter_label">地区：</div>
        <div class="filter_type">
          <van-tabs v-model:active="activeType" line-height="0" shrink title-inactive-color="#334115" title-active-color="#fff">
            <van-tab v-for="(item, index) in filterOptions.type" :title="item"></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="filter_item">
        <div class="filter_label">地区：</div>
        <div class="filter_type">
          <van-tabs v-model:active="activeYear" line-height="0" shrink title-inactive-color="#334115" title-active-color="#fff">
            <van-tab v-for="(item, index) in filterOptions.year" :title="item"></van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <div class="sort_group">
        <div :class="{'sort_item': true, 'active_sort_item': sortType === 0 ? true : false}" @click="sortType = 0">按时间顺序</div>
        <div :class="{'sort_item': true, 'active_sort_item': sortType === 1 ? true : false}" @click="sortType = 1">按人气顺序</div>
        <div :class="{'sort_item': true, 'active_sort_item': sortType === 2 ? true : false}" @click="sortType = 2">按评分顺序</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
const filterOptions = reactive<any>({
    place: ['全部','中国大陆','美国','香港','台湾','日本','韩国','英国','法国','德国','意大利','西班牙','印度'],
    type: ['全部','剧情','喜剧','动作','爱情','科幻','悬疑','惊悚','恐怖','犯罪','同性','音乐','歌舞'],
    year: ['全部','2023','2022','2021','2020','2019','2018','2017','2016','2015','2014','2013','2012']
})
const activePlace = ref(0);
const activeType = ref(1);
const activeYear = ref(1);
const sortType = ref<number>(0)
</script>
<style scoped lang="scss">
.topFilter_container {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #fff;
  margin-top: 24px;
  overflow: hidden;
  .filter_title {
    font-weight: 700;
    font-size: 16px;
    color: var(--van-pink);
    padding-top: 13px;
    padding-bottom: 13px;
    border-bottom: 1px solid rgb(238, 238, 238);
  }
  .filter_group {
    padding-top: 5px;
    overflow: hidden;
    .filter_item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 10px;
      padding-bottom: 10px;
      .filter_label {
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        color: #a1a4a9;
        font-weight: 500;
      }
      .filter_type {
        height: 21px;
        display: flex;
        flex-direction: row;
        align-items: center;
        // overflow: hidden;
        // padding-right: 20px;
        overflow-y: auto;
        scrollbar-width:none;
        -ms-overflow-style:none;
      }
      .filter_type::-webkit-scrollbar{display:none}
    }
  }
  .sort_group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
    .sort_item {
        font-size: 14px;
        padding: 3px 5px;
    }
    .active_sort_item {
        background-color: #EC2D7A;
        color: #fff;
        border-radius: 3px;
    }
  }
}
:deep(.van-tab__text) {
    font-size: 14px !important;
}
:deep(.van-tab--active) {
    background-color: #BEBEBE !important;
    border-radius: 3px !important;
}
</style>
