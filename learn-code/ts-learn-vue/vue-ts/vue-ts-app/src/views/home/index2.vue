<template>
    <div class="box">
        <header class="header"></header>
            <div class="content">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item>1</van-swipe-item>
                    <van-swipe-item>2</van-swipe-item>
                    <van-swipe-item>3</van-swipe-item>
                    <van-swipe-item>4</van-swipe-item>
                </van-swipe>
            </div>
        </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Swipe, SwipeItem } from 'vant'
import { State, Action } from 'vuex-class'

Vue.use(Swipe)
Vue.use(SwipeItem)

@Component({
})

export default class App extends Vue {
    //分模块的写法
    @State(state => state.home.prolist) prolist!: []

    @Action('home/getProlistAction') getProlistAction: any

    mounted () {
      this.getProlistAction({ count: 3 })
    }
}

</script>

<style lang="stylus">
.my-swipe .van-swipe-item
    color #fff
    font-size 20px
    line-height 150px
    text-align center
    background-color #39a9ed
</style>
