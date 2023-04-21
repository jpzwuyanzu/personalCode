<template>
  <div class="topFilter_container">
    <div class="filter_title">影视筛选</div>
    <div class="filter_group">
      <div class="filter_item">
        <div class="filter_label">地区：</div>
        <div class="filter_type">
          <van-tabs v-model:active="active1" line-height="0" shrink title-inactive-color="#334115" title-active-color="#fff">
            <van-tab v-for="index in 8" :title="'标签 ' + index"></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="filter_item">
        <div class="filter_label">地区：</div>
        <div class="filter_type">
          <van-tabs v-model:active="active2" line-height="0" shrink title-inactive-color="#334115" title-active-color="#fff">
            <van-tab v-for="index in 8" :title="'标签 ' + index"></van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="filter_item">
        <div class="filter_label">地区：</div>
        <div class="filter_type">
          <van-tabs v-model:active="active3" line-height="0" shrink title-inactive-color="#334115" title-active-color="#fff">
            <van-tab v-for="index in 8" :title="'标签 ' + index"></van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <div class="sort_group">
        <div class="sort_item active_sort_item">按时间顺序</div>
        <div class="sort_item">按人气顺序</div>
        <div class="sort_item">按评分顺序</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const active1 = ref(1);
const active2 = ref(1);
const active3 = ref(1);
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
        overflow: hidden;
      }
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
