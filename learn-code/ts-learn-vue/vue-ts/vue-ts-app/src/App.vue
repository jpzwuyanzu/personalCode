<template>
<div class="container">
    <!-- 命名视图 -->
    <router-view />
    <footer v-if="!$route.meta.hidden" class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class="iconfont icon-icon-test"></span>
          <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
          <span class="iconfont icon-fenlei"></span>
          <p>分类</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>购物车</p>
        </router-link>
        <router-link to="/user" tag="li">
          <span class="iconfont icon-wode1"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
//  类组件 + 扩展式组件 + 函数式组件
import { Vue, Component } from 'vue-property-decorator'
//  使用装饰器去装饰该组件
@Component({
})
export default class App extends Vue {

}
</script>

<style lang="stylus">
*
  padding 0
  margin 0
  text-decoration none
  list-style none
  touch-action none

html
  // font-size 100px
  // font-size 26.666666666vw // 以iphone6为设计基础 // 100 / 375 *100
  font-size 31.25vw // 以iphone5为基础 // 100/320*100
body
  font-size 12px

// 媒体查询 @media
// @media all and (max-width 300px)
//   body
//     background-color #123456
// @media all and (min-width 300px) and (max-width 640px)
//   body
//     background-color #654321

@media all and (orientation landscape)
  html
    font-size 100px

html, body, .container
  width 100%
  height 100%
.container
  max-width 750px
  margin 0 auto
  box-shadow 0 0 30px #000
  display flex
  flex-direction column
  .box
    flex 1
    display flex
    flex-direction column
    overflow auto
    .header
      width 100%
      height 0.44rem
      background-color #f66
    .content
      flex 1
      overflow auto
  .footer
    width 100%
    height 0.5rem
    background-color #ccc
    ul
      width 100%
      height 100%
      display flex
      li
        flex 1
        height 100%
        display flex
        flex-direction column
        align-items center
        justify-content center
        &.router-link-active
          color #f66
        span
          font-size 0.24rem
        p
          font-size 0.12rem
</style>
