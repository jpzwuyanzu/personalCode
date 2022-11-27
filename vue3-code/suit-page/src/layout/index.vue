<template>
    <div class="layout_container">
        <router-view/>
        <div class="page_bottom">
            <div class="bottom_container">
                <img src="../assets/bob/b01.png" alt="">
                <img src="../assets/bob/b02.png" alt="">
                <img src="../assets/bob/b03.png" alt="">
                <img src="../assets/bob/b04.png" alt="">
                <img src="../assets/bob/b05.png" alt="">
                <img src="../assets/bob/b06.png" alt="">
                <img src="../assets/bob/b07.png" alt="">
                <img src="../assets/bob/b08.png" alt="">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
@import "@/styles/calcSize";
.layout_container {
   width: 100vw;
   height: 100vh;
   position: relative;
   .page_bottom {
       position: absolute;
       height: vh(165);
       width: 100%;
       background: #2e3541;
       bottom: 0;
       padding: 0 10%;
       box-sizing: border-box;
       .bottom_container {
           width: 100%;
           height: 100%;
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: space-between;
           flex-wrap: wrap;
           overflow: hidden;
           img {
            //    width: vw(10);
            //    height: vh(10);
               object-fit: contain;
           }
       }
   }
}
@media screen and (max-width: 768px) {
    .page_bottom {
        height: vh(200) !important;
        padding: 0 15% !important;
        .bottom_container {
            img {
                height: vh(40);
            }
        }
    }
}
@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    .page_bottom {
        height: vh(200) !important;
        padding: 0 8% !important;
        .bottom_container {
            img {
                height: vh(50);
            }
        }
    }
}
// 兼容iphone6，iphone7，iphone8s
@media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
    .page_bottom {
        height: vh(200) !important;
        padding: 0 8% !important;
        .bottom_container {
            img {
                height: vh(50);
            }
        }
    }
}

// 兼容iphone6 Plus,iphone7 Plus,iphone8 Plus
@media (device-height: 736px) and (-webkit-min-device-pixel-ratio: 2) {
    .page_bottom {
        height: vh(200) !important;
        padding: 0 8% !important;
        .bottom_container {
            img {
                height: vh(50);
            }
        }
    }
}
// 兼容iphoneX
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .page_bottom {
        height: vh(200) !important;
        padding: 0 8% !important;
        .bottom_container {
            img {
                height: vh(40);
            }
        }
    }
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2){
    .page_bottom {
        height: vh(200) !important;
        padding: 0 8% !important;
        .bottom_container {
            img {
                height: vh(40);
            }
        }
    }
}
@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
    .page_bottom {
        height: vh(200) !important;
        padding: 0 8% !important;
        .bottom_container {
            img {
                height: vh(40);
            }
        }
    }
}

</style>