<template>
  <div class="loginPage">
    <div class="loginContainer">
      <h2>VUE3-ELEMENT3</h2>
      <div class="accountInput">
        <el-input
          v-model="account"
          type="text"
          placeholder="请输入用户名"
        ></el-input>
      </div>
      <div class="passInput">
        <el-input
          v-model="pass"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </div>
      <el-button type="primary" :loading="loginLoading === 0 ? false : true" class="loginBtn" @click="loginNow()"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Message, Notification } from "element3";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const account = ref("");
const pass = ref("");
const store = useStore();
const router = useRouter();
const loginLoading = ref(0)

function loginNow() {
  if (account.value === "" || pass.value === "") {
    Message({
      showClose: true,
      message: "用户名或密码不可以为空",
      type: "error",
    });
    return;
  }
  loginLoading.value = 1;
  //可以执行登录操作
  store.dispatch("saveUserInfoStateAction", { userName: account }).then((res) => {
      // console.log(res)
      // 在这里执行登录成功后的操作
      setTimeout(() => {
        loginLoading.value  = 0;
        router.push({ name: "Home" });
      },1000)
    });
}
onMounted(() => {
   Notification({
          title: '提示',
          message: '用户名为admin或者是visitor，密码随意！',
          duration: 0
        })
})
</script>

<style lang="scss" scoped>
.loginPage {
  width: 100%;
  height: 100%;
  background: #baa1ff linear-gradient(to right, #baa1ff, #7988fa) !important;
  position: relative;
  .loginContainer {
    width: 400px;
    height: 400px;
    background: #fff;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-200px, -200px);
    box-shadow: 0 0 5px #baa1ff;
    border-radius: 5px;
    padding: 40px;
    box-sizing: border-box;
    .accountInput {
      margin-bottom: 40px;
      padding-top: 20px;
    }
    .passInput {
      margin-bottom: 40px;
    }
    .loginBtn {
      width: 320px;
      padding: 14px 145px;
      box-sizing: border-box;
    }
  }
}
</style>
