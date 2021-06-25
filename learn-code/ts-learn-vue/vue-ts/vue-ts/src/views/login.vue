<template>
  <div class="loginContainer">
    <div class="loginForm">
      <div class="account">
        <input v-model="username" ref="accountRef" type="text" placeholder="用户名" @click="getFocus(1)">
      </div>
      <div class="pass">
        <input v-model="password" ref="passRef" type="password" placeholder="密码" @click="getFocus(2)">
      </div>
      <div class="loginBtn" @click="loginNow">登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { Notify } from 'vant'
import { setItem } from './../utils/common'

Vue.use(Notify)

@Component({})
export default class LoginPage extends Vue {
  @Action('changeUserInfoAction') changeUserInfoAction: any

  username = ''
  password = ''
  $router: any
  user: string[] = ['user1', 'user2']

  loginNow (): void {
    if (this.username === '') {
      Notify('用户名不可以为空')
      return
    }
    if (this.password === '') {
      Notify('密码不可以为空')
      return
    }
    if (this.user.indexOf(this.username) === -1) {
      Notify('用户名错误')
      return
    }
    this.changeUserInfoAction({ username: this.username }).then((res: any) => {
      console.log(res)
      setItem('username', JSON.stringify(res.name))
      setItem('age', JSON.stringify(res.age))
      setItem('token', JSON.stringify(res.token))
      setItem('loginState', JSON.stringify(true))
      this.$router.push({ name: 'Home' })
    })
  }

  getFocus (index: number): void {
    if (index === 1) {
      (this.$refs.accountRef as HTMLInputElement).focus()
    } else {
      (this.$refs.passRef as HTMLInputElement).focus()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loginContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('../assets/11.jpeg') no-repeat center;
  .loginForm {
    .account {
      input {
        border-radius: 60px;
        border: none;
        height: 100px;
        width: 600px;
        padding: 20px 30px;
        box-sizing: border-box;
        font-size: 30px;
        color: #ccc;
      }
    }
    .pass {
      margin-top: 40px;
      input {
        border-radius: 60px;
        border: none;
        height: 100px;
        width: 600px;
        padding: 20px 30px;
        box-sizing: border-box;
        font-size: 30px;
        color: #ccc;
      }
    }
    .loginBtn {
      width: 600px;
      text-align: center;
      color: white;
      font-size: 30px;
      height: 100px;
      line-height: 100px;
      background: #1a73e8;
      border-radius: 60px;
      margin-top: 40px;
    }
  }
}
</style>
