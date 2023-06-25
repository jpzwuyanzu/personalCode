<template>
  <van-action-sheet
    overlay-class="loginSheet_Container"
    v-model:show="isShowLoginCom"
    :style="{height:'95%', background: theme === 'dark' ? '#242A32' : '' }"
    @click-overlay="common.convertLoginSheet(false)"
  >
    <div class="loginSheet_Content">
      <div class="sheet_btn_line">
        <div :class="`cancel_btn_${theme}`" @click="common.convertLoginSheet(false)">取消</div>
        <div class="register_btn">注册</div>
      </div>
      <div class="login_top_part">
        <p class="hello">Hello!</p>
        <p class="welcome">欢迎来到7体育俱乐部</p>
      </div>
      <div :class="{ 'login_form': true, 'login_form_dark': theme === 'dark' ? true: false, 'login_form_light': theme === 'light' ? true : false }">
        <van-form>
            <van-cell-group inset>
                <van-field
                v-model="username"
                name="用户名"
                placeholder="请输入账号"
                clearable
                clear-trigger="always"
                />
                <div class="space_line"></div>
                <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="请输入密码"
                clearable
               clear-trigger="always"
                />
               <div class="cus_form_line">
                <div class="line_left" @click="changeRemmberStatus">
                  <img v-if="isRememberPass" src="@/assets/img/home/checked.png" alt="">
                  <img v-else src="@/assets/img/home/unchecked.png" alt="">
                  <span>记住密码</span>
                </div>
                <div class="line_right" @click="changeRemmberStatus">忘记密码?</div>
               </div>
               <div class="form_submit_line">
                <div class="left_part">手机号登录</div>
                <div :class="{'right_part': true ,'disLoginBtn': !isCanLogin}" @click="onSubmit" disabled>
                  <span>登录
                      <div class="icon-animation">
                      <img class="icon move move" src="@/assets/img/home/loginAni/icon_01.png" alt="">
                      <img class="icon move delay-one move delay-one" src="@/assets/img/home/loginAni/icon_02.png" alt="">
                      <img class="icon move delay-two move delay-two" src="@/assets/img/home/loginAni/icon_03.png" alt="">
                    </div>
                  </span>
                 
                </div>
               </div>
            </van-cell-group>
            <!-- <div style="margin: 16px;">
                <van-button round block type="success" native-type="submit">
                提交
                </van-button>
            </div> -->
        </van-form>
      </div>
      <div class="login_bottom_bg">
        <img src="@/assets/img/home/login_bg.png" alt="" />
      </div>
    </div>
  </van-action-sheet>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { showSuccessToast } from 'vant';
import { usePiniaState } from "@/hooks/usePiniaState";
const { loginSheetState, common, theme, user} = usePiniaState();

const isShowLoginCom = ref(false);
const isRememberPass = ref(false); 
const username = ref('');
const password = ref('');
const isCanLogin = ref(false);

const changeRemmberStatus = () => {
  isRememberPass.value = !isRememberPass.value
}

const onSubmit = () => {
  //在这里调用登录接口，修改用户登录状态
  console.log('submit', 'isRememberPass:',isRememberPass.value, 'username:',username.value, 'password:',password.value);
  user.changeLoginStatus(true)
  common.convertLoginSheet(false)
  showSuccessToast('登录成功');
};
watchEffect(() => {
  isShowLoginCom.value = loginSheetState.value;
  if(username.value && password.value) {
    isCanLogin.value = true
  } else {
    isCanLogin.value = false
  }
});
</script>
<style lang="scss" scoped>
.loginSheet_Content {
  min-height: 100%;
  padding-top: 12px;
  box-sizing: border-box;
  position: relative;
  .sheet_btn_line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .cancel_btn_light {
      color: #565E6A;
      font-size: 15px;
    }
    .cancel_btn_dark {
      color: #bccbd9;
      font-size: 15px;
    }
    .register_btn {
      color: #20b25b;
      font-size: 15px;
    }
  }
  .login_top_part {
    padding: 32px 25px 15px 25px;
    .hello {
      font-size: 25px;
      font-weight: 600;
      position: relative;
      display: inline-block;
      background: linear-gradient(
        180deg,
        transparent 0,
        transparent 50%,
        #20b25b 50.01%,
        #20b25b 75%,
        transparent 75.01%,
        transparent
      );
      height: 32px;
      line-height: 32px;
    }
    .welcome {
      font-size: 25px;
      font-weight: 600;
      height: 32px;
      line-height: 32px;
    }
  }
  .login_form {
    min-height: 400px;
    padding: 0 9px; 
    .space_line {
      height: 15px;
      background: #242A32;
    }
    .cus_form_line {
      padding-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: #242A32;
      font-weight: 400;
      color: #8696a2;
      font-size: 13px;
      .line_left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
          width: 15px;
          height: 16px;
          object-fit: contain;
          margin-right: 8px;
        }
      }
    }
    .form_submit_line {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: #242A32;
      padding-top: 20px;
      .left_part {
        color: #20b25b;
        font-size: 13px;
      }
      .right_part {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: #20b25b;
        border-radius: 5px;
        span {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 600;
          width: 149px;
          height: 44px;
          .icon-animation {
            display: flex;
            align-items: center;
            margin-left: 10px;
            .move {
              width: 8px;
              height: 11px;
              position: relative;
              color: #fff;
              animation: iconAnimation 1.5s infinite;
            }
            .delay-one {
              animation-delay: .3s;
            }
            .delay-two {
              animation-delay: .6s;
            }
          }
        }
      }
      .disLoginBtn {
        opacity: 0.5;
      }
    }
    :deep(.van-cell-group--inset) {
      border-radius: 0px;
    }
    :deep(.van-cell:after) {
      border: none;
    }
  }
  .login_form_light {
    .space_line {
      background: none;
    }
    .cus_form_line {
      background: none;
    }
    .form_submit_line {
      background: none;
      .right_part {
        span {
          color: #FFFFFF;
        }
      }
    }
    :deep(.van-cell) {
      background: #F5F7F9;
    }
  }
  .login_form_dark {
    :deep(.van-cell) {
      background: #1C2128;
    }
  }
  .login_bottom_bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 12.5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

@keyframes iconAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: .3;
  }
  100% {
    opacity: 1;
  }
}
</style>
