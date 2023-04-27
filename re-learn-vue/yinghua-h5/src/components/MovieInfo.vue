<template>
  <div class="move_info_con">
    <div class="media_part">
      <div class="media_left">
        <van-image
          width="100%"
          height="133"
          radius="3px"
          lazy-load
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </div>
      <div class="media_right">
        <div class="movie_title">
          蚁人与黄蜂女：量子狂潮 &nbsp;<span>(2023)</span>
        </div>
        <div class="director_label">导演：<span>拉里佩奇</span></div>
        <div class="main_role">
          <span class="role_info">
            <span class="role_lable">主演：</span
            >塞缪尔·杰克逊,迈克尔·道格拉斯,伊万杰琳·莉莉,保罗·路德,乔纳森·梅杰斯,米歇尔·菲佛,比尔·默瑞,凯瑟琳·...
          </span>
        </div>
      </div>
    </div>
    <div class="info_part">
      <div>
        <span>制片国家/地区：</span> <span class="label_t">美国</span> <span>&nbsp;&nbsp;<span>类型：</span><span class="label_t">喜剧</span></span>
      </div>
      <div>
        <span>剧情介绍：</span
        >
        <span class="detail">《蚁人3》将会深入探索量子领域这个神秘的空间，有关量子领域在以前已经做出了很好的铺垫，比如说《蚁人》中出现的量子城市、一些奇怪的生物，以及《复联4》的时空隧道等等，引入反派征服者·康，这是一位来自于未...</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.move_info_con {
  display: flex;
  flex-direction: column;
  .media_part {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    .media_left {
      width: 100px;
    }
    .media_right {
      flex: 1;
      padding: 2px 5px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      div {
        width: 100%;
      }
      .movie_title {
        font-weight: 700;
        font-size: 16px;
        color: #000;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          font-size: 13px;
          color: #555555;
        }
      }
      .director_label {
        font-size: 13px;
        color: #555555;
        span {
          color: #ec2d7a;
        }
      }
      .main_role {
        font-size: 13px;
        color: #555555;
        .role_info {
            color: #ec2d7a;
            .role_lable {
                color: #555555;
            }
        }
      }
    }
  }
  .info_part {
    font-size: 13px;
        color: #555555;
        div {
            .label_t {
                color: #ec2d7a;
            }
            .detail {
                color: rgba(0,0,0,.8);
            }
        }
  }
}
</style>
