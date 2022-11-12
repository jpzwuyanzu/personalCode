<template>
    <div class="layout_container">
        <router-view/>
        <div class="btn_group">
            <div class="btn btn_left btn_bob" @click="openNewLink('https://www.baidu.com', '_self')">BOB·官方入口</div>
            <div class="btn btn_right btn_app" @click="openNewLink('https://www.baidu.com','_blank')">博鱼·官方入口</div>
            <div class="btn btn_left btn_boyu" @click="openNewLink('https://www.baidu.com','_blank')">哈兰直播</div>
            <div class="btn btn_right btn_custom" @click="openNewLink('https://www.baidu.com','_blank')">在线客服</div>
        </div>
    </div>
</template>
<script setup lang="ts">
const openNewLink = (url: string, name: string) => {
    window.open(url, name);
}
</script>
<style lang="scss" scoped>
.layout_container {
   width: 100vw;
   height: 100vh;
   position: relative;
   background: rgba(23, 131, 176, 0.9);
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
        bottom: 0px;
        z-index: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        height: 250px;
        padding: 20px 0;
        box-sizing: border-box;
        .btn {
            width: 35%;
            text-align: center;
            font-size: 30px;
            color: #fff;
            font-weight: 600;
            padding: 18px 18px;
            border-radius: 40px;
        }
        .btn_left {
            background: linear-gradient(90deg, #5af2ff, #31c3ff);
            margin-left: 20px
        }
        .btn_right  {
            background: linear-gradient(90deg, #29ffaa, #00de7b);
            margin-right: 20px
        }
    }
}
</style>