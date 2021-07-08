<template>
  <div class="loginPage">
    <van-nav-bar
  style="background-color: #df2d2d;"
  title="猫眼电影"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="state.username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="state.password"
      type="password"
      name="pass"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" size="small" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from './../../store/index'
export default defineComponent({
  name: 'login',
  setup: () => {
    const router = useRouter()
    const store = useStore(key)
    const state = reactive({
      username: '',
      password: '',
    });
    const onSubmit = (values) => {
      console.log('submit', values);
      store.dispatch('loginNow', values).then(res => {
        router.push('/my')
      })
    };
    const onClickLeft = () => {
      router.back()
    }
    return { state, onSubmit, onClickLeft }
  }
})
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar__title) {
  color: #fff !important;
  font-weight: lighter;
}
:deep(.van-nav-bar .van-icon) {
  color: #fff !important;
}
:deep(.van-nav-bar__text) {
  color: #fff !important;
}
:deep(.van-button--primary) {
  background-color: #df2d2d;
  border: none;
}
</style>
