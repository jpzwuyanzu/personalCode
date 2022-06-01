<template>
  <div class="login-Com">
    <div class="login-form-part">
      <div class="loginForm">
        <h1>VUE3-ADMIN</h1>
        <a-form
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="username"
            :rules="[
              { required: true, message: '请输入用户名!' },
            ]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              { required: true, message: '请输入密码!' },
            ]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <a-form-item>
            <a-button style="width: 100%;" type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const store = useStore()
const router = useRouter()

const onFinish = (values: any) => {
  console.log("Success:", values);
  store.dispatch('saveUserInfoAction', { username: formState.username }).then(res => {
      console.log(res)
      if(res.code === 200) {
          //登录成功
          router.push({ name: 'home' })
      }
  })

};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<style lang="scss" scoped>
.login-Com {
  width: 100%;
  height: 100%;
  background: url("../assets/loginBg.jpeg") no-repeat center;
  background-size: cover;
  .login-form-part {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px #baa1ff;

    .loginForm {
      width: 350px;
      height: 320px;
      padding: 50px;
      background: white;
      border-radius: 6px;
      .comTitle {
        text-align: center;
        color: #70727c;
        margin-bottom: 50px;
      }
    }
  }
}
</style>