<template>
  <van-popup
    v-model:show="isShowPopup"
    position="left"
    closeable
    close-icon-position="top-left"
    :close-icon="theme === 'light' ? light_close : dark_close"
    :style="{ height: '100%' }"
    @click-overlay="hiddenPopup"
    @click-close-icon="hiddenPopup"
  >
    <div class="popup_content">
      <div class="left_popup_top">
        <!-- 切换主题 -->
        <div class="switchtheme_part">
          <div class="switch_container">
            <van-switch v-model="themeCheck" @change="switchThemeType" />
            <div v-if="theme === 'light'" class="icon-wrapper right_icon">
              <img src="@/assets/img/home/light_theme.png" />
            </div>
            <div v-else class="icon-wrapper left_icon">
              <img src="@/assets/img/home/dark_theme.png" />
            </div>
          </div>
        </div>
        <!-- 切换主题 -->
        <!-- 用户信息 -->
        <div class="userInfo_part">
          <div class="info_line">
            <div class="left_part">
              <div class="memberAccount">XIMENG001</div>
              <div class="memberLevel">
                <img class="user_avator" src="@/assets/img/home/member_level_0.png" alt="">
              </div>
            </div>
            <div class="right_part">
              <img class="user_avator" src="@/assets/img/home/avator.png" alt="">
            </div>
          </div>
          <div class="info_line">
            <div class="left_part">
              <div class="sign_days">已签到0天</div>
            </div>
            <div class="right_part">
              <div class="signBtn">
                <img class="sign_icon" src="@/assets/img/home/sign_icon.png" alt="">
                <span>签到</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 用户信息 -->
      </div>
      <div class="left_popup_middle">

      </div>
      <div class="left_popup_bottom">
        <span>官方赞助</span>
        <img src="@/assets/img/home/club.png" alt="">
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import light_close from "@/assets/img/home/light_close.png";
import dark_close from "@/assets/img/home/dark_close.png";
import { useTheme } from '@/hooks/useTheme'

const props = defineProps({
  leftPopupShow: {
    type: Boolean,
    default: false,
  }
});
const $emit = defineEmits(["switchLeftPopup"]);
const { theme, custheme } = useTheme();
const isShowPopup = ref(false);
const themeCheck = ref(false);
//关闭左侧设置浮框
const hiddenPopup = () => {
  $emit("switchLeftPopup", false);
};
//切换黑暗和浅色模式
const switchThemeType = (value: any) => {
  custheme.switchTheme(Boolean(value) ? "dark" : "light");
};
//同步变化
watchEffect(() => {
  isShowPopup.value = props.leftPopupShow;
  themeCheck.value = (theme.value === 'light' ? false : true)
});

</script>
<style lang="scss" scoped>
.popup_content {
  height: 100%;
  .left_popup_top {
    width: 230px;
    height: 174px;
    box-sizing: border-box;
    padding: 15px 13px 15px 20px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(35,43,51,.1);
    box-sizing: border-box;
    .switchtheme_part {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      .switch_container {
        position: relative;
        :deep(.van-switch--on) {
          background: #1c2128;
        }
        .icon-wrapper {
          width: 12px;
          height: 12px;
          position: absolute;
          top: calc(50% - 8px);
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .left_icon {
          left: 5px;
        }
        .right_icon {
          right: 5px;
        }
      }
    }
    .userInfo_part {
      display: flex;
      flex-direction: column;
      
      .info_line {
        padding-top: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .left_part {
          .memberAccount {
            width: 140px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 16px;
            height: 24px;
            line-height: 24px;
          }
          .memberLevel {
            margin-top: 3px;
            img {
              width: 37px;
              height: 15px;
              object-fit: contain;
            }
          }
          .sign_days {
            font-size: 15px;
            color: #858F9E;
          }
        }
        .right_part {
          .user_avator {
            width: 56px;
            height: 56px;
            object-fit: contain;
            border-radius: 50%;
          }
          .signBtn {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 88px;
            height: 34px;
            background: #f5f7f9;
            color: #858f9e;
            border-radius: 18px;
            .sign_icon {
              width: 16px;
              height: 18px;
              object-fit: contain;
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
  .left_popup_middle {
    height: calc(100% - 224px);
    border-bottom: 1px solid rgba(35,43,51,.1);
    box-sizing: border-box;
  }
  .left_popup_bottom {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    box-sizing: border-box;
    span {
      font-size: 12px;
      color: #8696A2;
    }
    img {
      width: 84px;
      height: 24px;
      object-fit: contain;
    }
  }
}
</style>
