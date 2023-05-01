<template>
  <div class="move_info_con">
    <div class="media_part">
      <div class="media_left">
        <van-image
          width="100%"
          height="133"
          radius="3px"
          lazy-load
          :src="movieInfoData.movieImage"
        />
      </div>
      <div class="media_right">
        <div class="movie_title">
          {{movieInfoData.movieDetail.name}} &nbsp;<span>({{ movieInfoData.movieDetail.date }})</span>
        </div>
        <div class="director_label">导演：<span>{{ movieInfoData.movieDetail.director }}</span></div>
        <div class="main_role">
          <span class="role_info">
            <span class="role_lable">主演：</span
            >{{ movieInfoData.movieDetail.mainRole }}
          </span>
        </div>
      </div>
    </div>
    <div class="info_part">
      <div>
        <span>制片国家/地区：</span> <span class="label_t">{{ movieInfoData.movieDetail.place }}</span> <span>&nbsp;&nbsp;<span>类型：</span><span class="label_t">{{ movieInfoData.movieDetail.type }}</span></span>
      </div>
      <div>
        <span>剧情介绍：</span
        >
        <span class="detail">{{ movieInfoData.movieDetail.desc }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps(['movieInfoData'])
</script>
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
            margin-top: 10px;
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
