<template>
  <div id="app">
    <router-view/>
    <footer v-if="!$route.meta.hidden" class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span><van-icon name="wap-home-o" /></span>
          <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
          <span><van-icon name="coupon-o" /></span>
          <p>分类</p>
        </router-link>
        <router-link to="/user" tag="li">
          <span><van-icon name="user-o" /></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer>
  </div>
</template>
<style lang="scss">
html, body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  .footer {
    height: 100px;
    overflow: hidden;
    font-size: 25px;
    background: #fff;
    ul{
      display: flex;
      flex-direction: row;
      height: 100%;
      li {
        flex: 1;
        height: 100%;
        padding-top: 10px;
        box-sizing: border-box;
        span {
          font-size: 35px;
        }
        p {
          padding: 0;
          margin: 0;
        }
      }
      .router-link-active {
        color: #1989fa;
      }
    }
  }
}
</style>
