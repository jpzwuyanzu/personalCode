<template>
  <div class="home_layout_container">
    <div class="home_top_part">
      <!-- 首页顶部推广下载模块 -->
      <div v-if="isShowDownLoadTips" class="downLoad_Tips">
        <div class="left_part">
          <img src="@/assets/img/home/app.png" alt="" />
          <span class="download_msg">下载APP，体验更多精彩</span>
        </div>
        <div class="right_part">
          <div class="download_now">立即下载</div>
          <img src="@/assets/img/home/close.png" alt="" @click="isShowDownLoadTips = !isShowDownLoadTips"/>
        </div>
      </div>
      <!-- 首页顶部推广下载模块 -->
      <div :class="{'header_line_center': true, 'header_line_center_dark': theme === 'dark'}">
        <div class="header_left">
          <img
            class="sys_setting_control"
            src="@/assets/img/home/leftSetting.png"
            alt=""
            @click="switchLeftPopup(true)"
          />
          <img v-if="theme === 'light'" class="sys_logo" src="@/assets/img/home/logo_light.png" alt="" />
          <img v-else class="sys_logo" src="@/assets/img/home/logo_dark.png" alt="" />
          <div class="notice_part">公告</div>
        </div>
        <!-- 判断是否登录，登录状态显示用户信息，未登录显示登录注册按钮 -->
        <div v-if="!loginState" class="register_login_btn">
          <span @click="showLoginPopup(1)">登录</span> / <span @click="showLoginPopup(2)">注册</span><van-icon name="arrow" />
        </div>
        <div v-else class="header_right">
          <span class="user_name">ximeng</span>
          <div class="user_banlance">
            <span>¥0.00</span>
            <img src="@/assets/img/home/addMoney.png" alt="" />
          </div>
        </div>
        <!-- 判断是否登录，登录状态显示用户信息，未登录显示登录注册按钮 -->
      </div>
      <div class="game_nav">
        <van-tabs  v-model:active="activeHomeTab" @change="linkPage()" :line-height="0">
          <van-tab
            v-for="(item, index) in homeTabList"
            :name="item.name"
            :title="item.tabName"
          ></van-tab>
        </van-tabs>
      </div>
    </div>
    <router-view></router-view>
    <LeftPopup
      @switchLeftPopup="switchLeftPopup"
      :leftPopupShow="leftPopupShow"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import LeftPopup from "@/views/Home/components/LeftPopup.vue";
import { usePiniaState } from '@/hooks/usePiniaState'
import { useAppRoute } from '@/hooks/useAppRoute'

//顶部tab选项
const activeHomeTab = ref<string>("fb");
//路由方法hooks
const {appRouter, appRoute} = useAppRoute();
//主题
const { theme, custheme, loginState, common } = usePiniaState();
//顶部tab列表
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
//是否显示顶部app下载提示
const isShowDownLoadTips = ref(true);
//是否显示左侧设置popup
const leftPopupShow = ref(false); 
//切换显示隐藏左侧设置浮框
const switchLeftPopup = (bool: boolean) => {
  leftPopupShow.value = bool;
};
//切换顶部tab
const linkPage = () => {
  appRouter.push("/home/" + activeHomeTab.value);
};
//登录/注册
const showLoginPopup = (type: number) => {
  if(type === 1) {
    common.convertLoginSheet(true)
  }
}

onMounted(() => {
  activeHomeTab.value = (appRoute.name as string)
})

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
      .register_login_btn {
        font-size: 14px;
        color:#05D464;
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
    .header_line_center_dark {
      background-color: #1c2128;
    }
    .game_nav {
      :deep(.van-tab--active){
        background: url('@/assets/img/home/nav_bg.png') no-repeat 50% !important;
        background-size: auto 100% !important;
        background-position: 50% -0.5px !important;
      }
    }
  }
}
</style>
