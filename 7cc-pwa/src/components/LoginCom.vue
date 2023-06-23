<template>
  <van-action-sheet
    overlay-class="loginSheet_Container"
    v-model:show="show"
    @click-overlay="common.convertLoginSheet(false)"
  >
    <div class="loginSheet_Content">
      <div class="sheet_btn_line">
        <div class="cancel_btn" @click="common.convertLoginSheet(false)">取消</div>
        <div class="register_btn">注册</div>
      </div>
      <div class="login_top_part">
        <p class="hello">Hello!</p>
        <p class="welcome">欢迎来到7体育俱乐部</p>
      </div>
      <div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                v-model="username"
                name="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="success" native-type="submit">
                提交
                </van-button>
            </div>
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
import { usePiniaState } from "@/hooks/usePiniaState";
const { loginSheetState, common } = usePiniaState();

const show = ref(false);
const username = ref('');
    const password = ref('');
    const onSubmit = (values: any) => {
      console.log('submit', values);
    };
watchEffect(() => {
  show.value = loginSheetState.value;
});
</script>
<style lang="scss" scoped>
.loginSheet_Content {
  min-height: 750px;
  padding-top: 12px;
  box-sizing: border-box;
  position: relative;
  .sheet_btn_line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .cancel_btn {
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
</style>
