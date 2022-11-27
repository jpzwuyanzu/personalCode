<template >
    <div class="home_container">
        <div class="left_part">
            <img src="../../assets/bob/person.png" alt="">
        </div>
        <div class="right_part">
            <div class="logo_part">
                <img class="bobLogo" src="../../assets/bob/bobLogo.png" alt="">
                <img class="boyuLogo" src="../../assets/bob/boyuLogo.png" alt="">
            </div>
            <div class="center_part">
                <div class="team_Item">
                    <img src="../../assets/bob/ico01.png" alt="">
                    <span class="title">荷兰国家足球队</span>
                    <span class="label">亚洲官方战略合作伙伴</span>
                </div>
                <div class="team_Item">
                    <img src="../../assets/bob/ico02.png" alt="">
                    <span class="title">威尔士国家足球队</span>
                    <span class="label">全球赞助合作伙伴</span>
                </div>
                <div class="team_Item">
                    <img src="../../assets/bob/ico03.png" alt="">
                    <span class="title">那不勒斯俱乐部</span>
                    <span class="label">亚洲区官方合作伙伴</span>
                </div>
                <div class="team_Item">
                    <img src="../../assets/bob/ico04.png" alt="">
                    <span class="title">多特蒙德俱乐部</span>
                    <span class="label">亚洲官方合作伙伴</span>
                </div>
                <div class="team_Item">
                    <img src="../../assets/bob/ico05.png" alt="">
                    <span class="title">菲利波·因扎吉</span>
                    <span class="label">BOB体育形象代言人</span>
                </div>
                <div class="team_Item">
                    <img src="../../assets/bob/ico06.png" alt="">
                    <span class="title">法甲里昂俱乐部</span>
                    <span class="label">亚洲官方合作伙伴</span>
                </div>
            </div>
            <div class="bottom_part">
                <img src="../../assets/bob/btn_top.png" alt="">
                <div class="btn_group">
                    <div>点击注册</div>
                    <div>备用网址</div>
                    <div>下载APP</div>
                    <div>博鱼体育</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
@import "@/styles/calcSize";
.home_container {
    width: 100vw;
    height: 100vh;
    background: url('../../assets/bob/mainbg.png') no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
    padding-top: vh(99);
    box-sizing: border-box;
    .left_part {
        // position: absolute;
        // left: vw(326);
        // top: vh(99);
        img {
          height: vh(1500);
        }
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: vw(150);
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           padding-top: vh(71);
           margin-left: vw(120);
           margin-bottom: vh(160);
           .bobLogo {
               height: vh(90);
           } 
           .boyuLogo {
               height: vh(90);
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(12);
                margin-right: vw(12);
                img {
                    width: vw(62);
                    height: vh(110);
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(16);
                    margin-bottom: vh(9);
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(165);
                height: vh(75);
                margin-top: vh(250);
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(45);
                    margin-left: vw(15);
                    margin-right: vw(15);
                    border-radius: 10px;
                    cursor: pointer;
                }
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .left_part {
        display: none;
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: 0 !important;
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           padding-top: 0 !important;
           margin-left: 0 !important;
           margin-bottom: vh(90) !important;
           .bobLogo {
               height: vh(70) !important;
           } 
           .boyuLogo {
               height: vh(70) !important;
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;
            flex-wrap: wrap;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(20) !important;
                margin-right: vw(20) !important;
                margin-bottom: vh(45) !important;
                
                img {
                    width: vw(180) !important;
                    height: vh(80) !important;
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(6) !important;
                    margin-bottom: vh(9);
                    white-space: nowrap !important;
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                    white-space: nowrap !important;
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(650) !important;
                height: vh(80) !important;
                margin-top: vh(200) !important;
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                flex-wrap: wrap;
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(190) !important;
                    margin-left: vw(30) !important;
                    margin-right: vw(30) !important;
                    border-radius: 20px !important;
                    margin-bottom: vh(45) !important;
                    cursor: pointer;
                }
            }
        }
    }
}
@media (device-height: 568px) and (-webkit-min-device-pixel-ratio: 2) {
   .left_part {
        display: none;
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: 0 !important;
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           padding-top: 0 !important;
           margin-left: 0 !important;
           margin-bottom: vh(90) !important;
           .bobLogo {
               height: vh(70) !important;
           } 
           .boyuLogo {
               height: vh(70) !important;
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;
            flex-wrap: wrap;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(20) !important;
                margin-right: vw(20) !important;
                margin-bottom: vh(20) !important;
                
                img {
                    width: vw(180) !important;
                    height: vh(80) !important;
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(6) !important;
                    margin-bottom: vh(9);
                    white-space: nowrap !important;
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                    white-space: nowrap !important;
                    display: none;
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(650) !important;
                height: vh(80) !important;
                margin-top: vh(40) !important;
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                flex-wrap: wrap;
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(190) !important;
                    margin-left: vw(30) !important;
                    margin-right: vw(30) !important;
                    border-radius: 20px !important;
                    margin-bottom: vh(45) !important;
                    cursor: pointer;
                }
            }
        }
    }
}
// 兼容iphone6，iphone7，iphone8s
@media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
   .left_part {
        display: none;
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: 0 !important;
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           padding-top: 0 !important;
           margin-left: 0 !important;
           margin-bottom: vh(90) !important;
           .bobLogo {
               height: vh(70) !important;
           } 
           .boyuLogo {
               height: vh(70) !important;
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;
            flex-wrap: wrap;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(20) !important;
                margin-right: vw(20) !important;
                margin-bottom: vh(45) !important;
                
                img {
                    width: vw(180) !important;
                    height: vh(80) !important;
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(6) !important;
                    margin-bottom: vh(9);
                    white-space: nowrap !important;
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                    white-space: nowrap !important;
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(650) !important;
                height: vh(80) !important;
                margin-top: vh(200) !important;
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                flex-wrap: wrap;
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(190) !important;
                    margin-left: vw(30) !important;
                    margin-right: vw(30) !important;
                    border-radius: 20px !important;
                    margin-bottom: vh(45) !important;
                    cursor: pointer;
                }
            }
        }
    }
}

// 兼容iphone6 Plus,iphone7 Plus,iphone8 Plus
@media (device-height: 736px) and (-webkit-min-device-pixel-ratio: 2) {
    .left_part {
        display: none;
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: 0 !important;
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           padding-top: 0 !important;
           margin-left: 0 !important;
           margin-bottom: vh(90) !important;
           .bobLogo {
               height: vh(70) !important;
           } 
           .boyuLogo {
               height: vh(70) !important;
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;
            flex-wrap: wrap;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(20) !important;
                margin-right: vw(20) !important;
                margin-bottom: vh(45) !important;
                
                img {
                    width: vw(180) !important;
                    height: vh(80) !important;
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(6) !important;
                    margin-bottom: vh(9);
                    white-space: nowrap !important;
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                    white-space: nowrap !important;
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(650) !important;
                height: vh(80) !important;
                margin-top: vh(200) !important;
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                flex-wrap: wrap;
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(190) !important;
                    margin-left: vw(30) !important;
                    margin-right: vw(30) !important;
                    border-radius: 20px !important;
                    margin-bottom: vh(45) !important;
                    cursor: pointer;
                }
            }
        }
    }
}
// 兼容iphoneX
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .left_part {
        display: none;
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: 0 !important;
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           padding-top: 0 !important;
           margin-left: 0 !important;
           margin-bottom: vh(90) !important;
           .bobLogo {
               height: vh(70) !important;
           } 
           .boyuLogo {
               height: vh(70) !important;
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;
            flex-wrap: wrap;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(20) !important;
                margin-right: vw(20) !important;
                margin-bottom: vh(45) !important;
                
                img {
                    width: vw(180) !important;
                    height: vh(80) !important;
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(6) !important;
                    margin-bottom: vh(9);
                    white-space: nowrap !important;
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                    white-space: nowrap !important;
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(650) !important;
                height: vh(80) !important;
                margin-top: vh(200) !important;
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                flex-wrap: wrap;
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(190) !important;
                    margin-left: vw(30) !important;
                    margin-right: vw(30) !important;
                    border-radius: 20px !important;
                    margin-bottom: vh(45) !important;
                    cursor: pointer;
                }
            }
        }
    }
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2){
    .left_part {
        display: none;
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: 0 !important;
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           padding-top: 0 !important;
           margin-left: 0 !important;
           margin-bottom: vh(90) !important;
           .bobLogo {
               height: vh(70) !important;
           } 
           .boyuLogo {
               height: vh(70) !important;
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;
            flex-wrap: wrap;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(20) !important;
                margin-right: vw(20) !important;
                margin-bottom: vh(45) !important;
                
                img {
                    width: vw(180) !important;
                    height: vh(80) !important;
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(6) !important;
                    margin-bottom: vh(9);
                    white-space: nowrap !important;
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                    white-space: nowrap !important;
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(650) !important;
                height: vh(80) !important;
                margin-top: vh(200) !important;
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                flex-wrap: wrap;
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(190) !important;
                    margin-left: vw(30) !important;
                    margin-right: vw(30) !important;
                    border-radius: 20px !important;
                    margin-bottom: vh(45) !important;
                    cursor: pointer;
                }
            }
        }
    }
}
@media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3){
    .left_part {
        display: none;
    }
    .right_part {
        display: flex;
        flex-direction: column;
        margin-left: 0 !important;
        .logo_part {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: center;
           padding-top: 0 !important;
           margin-left: 0 !important;
           margin-bottom: vh(90) !important;
           .bobLogo {
               height: vh(70) !important;
           } 
           .boyuLogo {
               height: vh(70) !important;
               margin-left: vw(150);
           }
        }
        .center_part {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between !important;
            flex-wrap: wrap;
            .team_Item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: vw(20) !important;
                margin-right: vw(20) !important;
                margin-bottom: vh(45) !important;
                
                img {
                    width: vw(180) !important;
                    height: vh(80) !important;
                    margin-bottom: vh(15);
                }
                .title {
                    color: #fff;
                    font-size: vw(6) !important;
                    margin-bottom: vh(9);
                    white-space: nowrap !important;
                }
                .label {
                    color: #fff;
                    font-size: vw(5);
                    white-space: nowrap !important;
                }
            }
        }
        .bottom_part {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: vw(650) !important;
                height: vh(80) !important;
                margin-top: vh(200) !important;
            }
            .btn_group {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: vh(85);
                flex-wrap: wrap;
                div {
                    background: url('../../assets/bob/btnBg.png') no-repeat center;
                    color: #fff;
                    text-align: center;
                    padding: vh(15) vw(190) !important;
                    margin-left: vw(30) !important;
                    margin-right: vw(30) !important;
                    border-radius: 20px !important;
                    margin-bottom: vh(45) !important;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>