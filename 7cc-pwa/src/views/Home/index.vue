<template>
  <div class="home_layout_container">
    <div class="home_top_part">
      <!-- 首页顶部推广下载模块 -->
      <div class="downLoad_Tips">
        <div class="left_part">
          <img src="@/assets/img/home/app.png" alt="" />
          <span class="download_msg">下载APP，体验更多精彩</span>
        </div>
        <div class="right_part">
          <div class="download_now">立即下载</div>
          <img src="@/assets/img/home/close.png" alt="" />
        </div>
      </div>
      <!-- 首页顶部推广下载模块 -->
      <div class="header_line_center">
        <div class="header_left">
          <img
            class="sys_setting_control"
            src="@/assets/img/home/leftSetting.png"
            alt=""
            @click="switchLeftPopup(true)"
          />
          <img class="sys_logo" src="@/assets/img/home/logo.png" alt="" />
          <div class="notice_part">公告</div>
        </div>
        <div class="header_right">
          <span class="user_name">ximeng</span>
          <div class="user_banlance">
            <span>¥0.00</span>
            <img src="@/assets/img/home/addMoney.png" alt="" />
          </div>
        </div>
      </div>
      <van-tabs v-model:active="activeHomeTab" @change="linkPage()">
        <van-tab
          v-for="(item, index) in homeTabList"
          :name="item.name"
          :title="item.tabName"
        ></van-tab>
      </van-tabs>
    </div>
    <router-view></router-view>
    <LeftPopup
      @switchLeftPopup="switchLeftPopup"
      :leftPopupShow="leftPopupShow"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import LeftPopup from "@/views/Home/components/LeftPopup.vue";
import { useRouter } from "vue-router";
const activeHomeTab = ref("fb");
const appRouter = useRouter();
const homeTabList = reactive([
  {
    tabName: "FB体育",
    path: "/home/fb",
    name: "fb",
    id: 1,
  },
  {
    tabName: "IM体育",
    path: "/home/im",
    name: "im",
    id: 2,
  },
  {
    tabName: "棋牌游戏",
    path: "/home/c-game",
    name: "c-game",
    id: 3,
  },
  {
    tabName: "电竞",
    path: "/home/g-game",
    name: "g-game",
    id: 4,
  },
  {
    tabName: "体育赛事",
    path: "/home/s-game",
    name: "s-game",
    id: 5,
  },
  {
    tabName: "娱乐城",
    path: "/home/group",
    name: "group",
    id: 6,
  },
]);
const leftPopupShow = ref(false);
const switchLeftPopup = (bool: boolean) => {
  console.log("90909");
  leftPopupShow.value = bool;
};
const linkPage = () => {
  appRouter.push("/home/" + activeHomeTab.value);
};
</script>
<style lang="scss" scoped>
.home_layout_container {
  overflow: hidden;
  height: 100%;
  .home_top_part {
    .downLoad_Tips {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(90deg, #21b37e 1.4%, #20b25b);
      height: 33px;
      padding: 0 5px;
      .left_part {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 11px;
          height: 13px;
          object-fit: contain;
          margin-right: 5px;
        }
        span {
          color: #fff;
          font-size: 13px;
        }
      }
      .right_part {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          object-fit: contain;
          margin-left: 8px;
        }
        .download_now {
          color: #20b25b;
          padding: 3px 8px;
          background-color: #f5f7f9;
          border-radius: 11px;
          font-size: 13px;
        }
      }
    }
    .header_line_center {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 7px 11px 7px 12px;
      height: 45px;
      box-sizing: border-box;
      .header_left {
        display: flex;
        flex-direction: row;
        align-items: center;
        .sys_setting_control {
          width: 3px;
          height: 13px;
          object-fit: contain;
        }
        .sys_logo {
          width: 45px;
          height: 26px;
          object-fit: contain;
          margin-left: 10px;
        }
        .notice_part {
          width: 123px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
      }
      .header_right {
        display: flex;
        flex-direction: column;
        .user_name {
          white-space: nowrap;
          font-size: 13px;
          color: #8596a2;
        }
        .user_banlance {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          img {
            width: 10px;
            height: 10px;
            object-fit: contain;
            margin-left: 5px;
          }
          span {
            font-weight: 600;
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
