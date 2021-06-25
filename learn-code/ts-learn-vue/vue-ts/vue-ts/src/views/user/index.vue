<template>
  <div class="userContainer">
    <p>用户名: {{username}}</p>
    <p>年龄: {{age}}</p>
    <van-button type="default" @click="loginout()">退出登录</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { removeItem } from './../../utils/common'

@Component
export default class UserPage extends Vue {
  @Prop() private msg!: string;

  @State('username') username!: string
  @State('age') age!: string

  @Action('loginOutAction') loginOutAction: any
  $router: any

  loginout (): void {
    removeItem('token')
    this.loginOutAction()
    this.$router.push({ name: 'login' })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userContainer {
  height: calc(100% - 100px);
   overflow-y: auto;
}
</style>
