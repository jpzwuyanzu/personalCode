<template >
    <div class="home_container">
        <Child @changePageNum="changePageNum" :pageNum="pageNum"/>
        <swiper
            direction="vertical"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            style="width: 100%;height: 100%;"
        >
            <swiper-slide>
                <div class="swiper_img_container">
                    <img class="swiper_img" src="../../assets/01.gif" alt="">
                    <div class="img_text">
                        <div class="text_title">抖音生活者说，致每一位好好生活的人</div>
                        <div class="text_line"></div>
                        <div class="text_content">好好生活就是美好生活。我们找到15位抖音用户，他们想好好生活的心，总是遇见抖音上想好好生活的人，帮助彼此对抗时间、困顿、迷茫</div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper_img_container">
                    <img class="swiper_img" src="../../assets/02.gif" alt="">
                    <div class="img_text">
                        <div class="text_title">抖音美好奇妙日与夜，每个人都是某个人的光</div>
                        <div class="text_line"></div>
                        <div class="text_content">2021创作者嘉年华，超百位达人和明星创作者，出现在这个舞台上，为大家展现抖音创作者的风采。创作让我们相遇，致每一位不停创造的创作者</div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper_img_container">
                    <img class="swiper_img" src="../../assets/03.gif" alt="">
                    <div class="img_text">
                        <div class="text_title">字节跳动公益平台正式在抖音上线</div>
                        <div class="text_line"></div>
                        <div class="text_content">2021年11月19日，字节跳动公益平台在抖音正式上线。公益机构、创作者及用户均可在抖音高效参与公益项目</div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper_img_container">
                    <img class="swiper_img" src="../../assets/04.gif" alt="">
                    <div class="img_text">
                        <div class="text_title">960万平方公里的美好现场</div>
                        <div class="text_line"></div>
                        <div class="text_content">四年来，抖音直播将五湖四海的人们连接在一起，时空的隔阂被打破，共同见证、分享、传递生活中的美好</div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import Child from '../../components/myChild.vue'
  import { useStore } from 'vuex'
    interface ISwiper {
      [key: string]: any
  }
  const pageNum = ref<number>(1);
  const changePageNum = (val: number) => {
      console.log(val)
      pageNum.value = val;
  }

  const appStore = useStore();
  const onSwiper = (swiper: any) => {
    // console.log(swiper);
  };
  const onSlideChange = ({ activeIndex }: ISwiper) => {
    appStore.dispatch("changeSwiperIndexAction", { swiperIndex: activeIndex })
  };
</script>
<style lang="scss" scoped>
.home_container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;

}
:deep(.swiper-slide) {
    width: 100vw !important;
   height: 100vh !important;
}
.swiper_img_container {
    width: 100vw;
    height: 100vh;
    position: relative;
    .swiper_img {
        width: 100%;
        height: 100%;
    }   
    .img_text {
        position: absolute;
        z-index: 1;
        top: 150px;
        left: 0;
        right: 0;
        margin: auto;
        width: 75%;
        .text_title {
            font-style: normal;
            font-weight: bold;
            font-size: 60px;
            line-height: 70px;
            color: #fff;
        }
        .text_line {
            height: 1px;
            background: #fff;
            margin-top: 24px;
            margin-bottom: 16px;
            opacity: .1;
        }
        .text_content {
            font-weight: 500;
            font-size: 25px;
            line-height: 48px;
            text-align: justify;
            color: #fff;
            opacity: .7;
        }
    }
}
</style>