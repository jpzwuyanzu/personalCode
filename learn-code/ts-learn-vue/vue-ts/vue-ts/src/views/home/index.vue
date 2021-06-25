<template>
  <div class="homeContainer">
    <van-nav-bar title="首页"/>
    <div class="content">
      <div class="scrollPart">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in imgList" :key="index">
          <img v-lazy="item" alt="">
        </van-swipe-item>
      </van-swipe>
        <div class="productList">
          <div class="partTitle">猜你喜欢</div>
          <van-card
            v-for="(item,index) in prolist"
            :key="index"
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Lazyload } from 'vant'

Vue.use(Lazyload)

@Component({})
export default class HomePage extends Vue {
  @State('proList') proList!: []

  @Action('changeProlistAction') changeProlistAction: any

  mounted (): void {
    this.changeProlistAction({ count: 3 })
    // console.log(window)
  }

  imgList: string[] = [
    'https://img01.yzcdn.cn/vant/apple-1.jpg',
    'https://img01.yzcdn.cn/vant/apple-2.jpg',
    'https://img01.yzcdn.cn/vant/apple-3.jpg',
    'https://img01.yzcdn.cn/vant/apple-4.jpg'
  ]

  prolist: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/ .van-nav-bar__title {
  color: #1989fa;
}
.homeContainer {
   height: calc(100% - 100px);
   overflow: hidden;
   .content {
     background: #f0efed;
     height: calc(100% - 96px);
     overflow-y: scroll;
     .scrollPart {
       .my-swipe {
         width: 100%;
         height: 250px;
         margin-top: 10px;
        .van-swipe-item {
        background-color: #39a9ed;
        img {
          width: 100%;
          height: 100%;
        }
      }
       }
       .productList {
         padding-top: 10px;
         .partTitle {
           height: 50px;
           line-height: 50px;
           font-size: 30px;
           background: #fff;
           text-align: left;
           padding-left: 20px;
         }
       }
     }
   }
}
</style>
