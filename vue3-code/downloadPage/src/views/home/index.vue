<template >
    <div class="home_container">
        <swiper
            class="swiper_box_container"
            :modules="modules"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }"
        >
            <swiper-slide>
                <div class="swiper_img_container">
                    <img class="swiper_img" src="../../assets/1.jpg" alt="">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper_img_container">
                    <img class="swiper_img" src="../../assets/2.jpg" alt="">
                </div>
            </swiper-slide>
        </swiper>
        <div class="desc_part">
            <img class="welcome_img" src="../../assets/welcome.png" alt="">
            <h1 class="title">BOB·博鱼体育</h1>
            <h2 class="desc">世界杯合作伙伴QQ:381791926</h2>
            <p class="line"></p>
        </div>
    </div>
</template>
<script setup lang="ts">
  import { Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/scss/navigation';
  const modules: any = [Autoplay];
</script>
<style lang="scss" scoped>
.home_container {
    width: 100vw;
    height: 100vh;
    position: relative;
    .desc_part {
        width: 100%;
        position: absolute;
        bottom: 240px;
        z-index: 3;
        .welcome_img {
            width: 290px;
            object-fit: contain;
        }
        .title {
            font-size: 80px;
            font-weight: 600;
            padding-left: 20px;
            color: #fff;
        }
        .desc {
           font-size: 50px;
           font-weight: 600;
           padding-left: 20px;
           color: #fff; 
           margin-top: 2vh;
        }
        .line {
            width: 75%;
            height: 5px;
            margin-top: 2.5vh;
            background-color: #dafbfd;
            border: none;
        }
    }
    .footer_group {
        position: fixed;
        width: 100%;
        height: 100%;
        bottom: 0;
        // background: rgba(26, 101, 132, 0.9);
        z-index: 1;
    }
}
.swiper_img_container {
    .swiper_img {
        width: 100%;
    }
}
</style>