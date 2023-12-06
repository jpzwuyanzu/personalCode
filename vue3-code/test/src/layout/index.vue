<template>
    <div class="layout_container">
        <router-view/>
    </div>
</template>
<script setup lang="ts">
import { useMapState } from './../hooks/useMapState'
const {swiperIndex } = useMapState(['swiperIndex'])
</script>
<style lang="scss" scoped>
.layout_container {
   width: 100vw;
   height: 100vh;
   position: relative;
    .left_music_icon {
        position: absolute;
        z-index: 3;
        width: 136px;
        height: 63px;
        left: 35px;
        top: 35px;
        svg {
            object-fit: contain;
        }
    }
    .btn_group {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 100px;
        z-index: 1;
        .downLoad_now {
            background: #fff;
            border: 2px solid #fff;
            border-radius: 16px;
            width: 80%;
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            color: #000;
            margin: 0 auto;
            text-align: center;
            margin-bottom: 40px;
        }
        .recharge_now {
            background: rgba(0,0,0,0.2);
            width: 80%;
            height: 80px;
            border: 2px solid #fff;
            border-radius: 16px;
            font-size: 34px;
            color: #fff;
            line-height: 80px;
            margin: 0 auto;
            text-align: center;
        }
    }
    .next_page_btn {
        position: absolute;
        bottom: 30px;
        width: 26px;
        height: 14px;
        line-height: 14px;
        left: 0;
        right: 0;
        margin: auto;
        svg {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transform: rotate(180deg);
        }
    }
}
</style>