<template>
  <div class="home_layout_container">
    <div class="home_top_part">
    <router-view></router-view>
  </div>
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
