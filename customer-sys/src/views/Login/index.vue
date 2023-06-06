<template>
  <div class="login_form_page_container">
    <div class="login_form_container">
      <a-form  class="cusTomerForm">
        <h1 style="margin-bottom: 30px;text-align: center;">electron 客服系统</h1>
        <a-form-item v-bind="validateInfos.username">
          <a-input
            v-model:value="modelRef.username"
            placeholder="帐号"
            @blur="validate('username', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input
            v-model:value="modelRef.password"
            placeholder="密码"
            @blur="validate('password', { trigger: 'blur' }).catch(() => {})"
          />
        </a-form-item>
        <a-form-item  style="width: 100%">
          <div class="loginBrn_part">
            <a-button type="primary" v-preventReClick="2000" style="width: 100%" @click.prevent="loginNow">登录</a-button>
            <!-- <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button> -->
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import { Form, message } from 'ant-design-vue';
import type {ILogin} from "./../../types/interface";
import { setStorage } from '../../utils/common'
import { useRouter } from 'vue-router'
const appRouter  = useRouter();
const useForm = Form.useForm;

const modelRef = reactive<ILogin>({
  username: '',
  password: ''
})

const ruleRef = reactive<any>({
  username: [
    {
      required: true,
      message: '请输入用户名称'
    },
    {
      min: 3,
      max: 10,
      message: '用户名称长度限制为3-10位',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      min: 5,
      max: 10,
      message: '用户密码长度限制为5-10位',
      trigger: 'blur'
    }
  ]
})

const { resetFields, validate, validateInfos } = useForm(modelRef, ruleRef);

const loginNow = async () => {
  setStorage('local', 'token', '123132')
  appRouter.push('/')
  // try {
  //   const values = await validate()
  //   const resp = await appStore.dispatch('user/saveUserInfoAction', toRaw(modelRef));
  //   if(resp.code === 200) {
  //     //登录成功，跳转到首页
  //     appRouter.push('/')
  //   }
  // } catch (error) {
  //   console.log(error)
  //   message.error('用户名或密码错误')
  // }
}


</script>
<style scoped lang="scss">
.login_form_page_container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: url('../../assets/images/loginBg.jpeg') no-repeat center;
    background-size: 110% 100%;
  .login_form_container {
    width: 330px;
    height: 280px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 2px 1px 2px #fff;
    .cusTomerForm {
      width: 100%;
    }
  }
}
.loginBrn_part {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
