<template>
    <div class="page_footer_container">
        <div class="tops_tips">
            本站所有视频和图片均来自互联网收集而来，版权归原创者所有，本网站只提供web页面服务，并不提供资源存储，也不参与录制、上传。
        </div>
        <div class="tops_tips">
            若本站收录的内容无意侵犯了贵司版权，请发邮件至hello@example.com，收到信息后会在一个星期内删除侵权内容，谢谢。
        </div>
        <div class="tg_concat">本站TG交流群:</div>
        <div class="tg_tips">点击加入TG群: 努努影院 @nunuyingyuan</div>
        <div class="webSite_support">
            <div class="title">本站赞助商App</div>
            <div class="app_list">
                <div class="app_item" v-for="(item, index) in 4">
                    <van-image
                    width="100%"
                    height="60"
                    lazy-load
                    radius="5px"
                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                    <div style="text-align: center;">App名称</div>
                </div>
            </div>
        </div>
        <!-- <div class="other_site_suggessted">
            <div class="title">影视(韩漫)站推荐: </div>
            <div class="site_list">
                <div class="site_item"></div>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
    .page_footer_container {
        padding: 4px 16px;
        background-color: rgb(239, 239, 239);
        margin-top: 24px;
       .tops_tips {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            text-align: center;
            font-size: 13px;
            color: #2f3035b3;
            margin-bottom: 5px;
       }
       .tg_concat {
        padding: 10px;
        font-size: 16px;
        color: #64b5ef;
        text-align: center;
       }
       .tg_tips {
        text-align: center;
        font-size: 14px;
        padding: 10px;
       }
       .webSite_support {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 20px;
        .title {
            text-align: center;
            color: #1122FF;
            font-size: 16px;
        }
        .app_list {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .app_item {
                width: 60px;
                padding: 10px;
                box-sizing: content-box;
            }
        }
       }
    }
</style>
