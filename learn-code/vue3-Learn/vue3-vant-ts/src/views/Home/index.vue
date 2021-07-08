<template>
  <div class="homePage">
    <div class="hotModel">
      <div class="bestMovies">
        <p class="partTitle">最受好评电影</p>
        <van-swipe :loop="false" :width="85" :height="142" :show-indicators="false">
           <van-swipe-item v-for="(item, index) in  movieList.data" :key="index">
            <div class="default-img-bg">
              <img style="width:100%;height:100%;" v-lazy="item.img" alt="">
              <span class="wish-bg"></span>
              <span class="score">观众评分  {{ item.sc }}</span>
            </div>
            <h5 class="top-bar-name">{{ item.nm }}</h5>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="moviesList">
        <div class="movie-list-item" v-for="item of movieList.data" :key="item.id">
          <div class="leftPart-img">
            <img v-lazy="item.img" alt="">
          </div>
          <div class="rightPart-info">
            <div class="content">
              <div class="movie-title">{{ item.nm }}</div>
              <div class="movie-rate"><span style="font-size: 13px; color: #666;">观众评  </span><span style="    font-weight: 700; color: #faaf00; font-size: 15px;">{{ item.sc }}</span></div>
              <div class="movie-actor">主演：{{ item.star }}</div>
              <div class="movie-show-info">{{ item.showInfo }}</div>
            </div>
            <div class="button-block">
              <div class="btn-normal"><span>购票</span></div>
              <!-- <div class="btn-pre"><span>预售</span></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { key } from './../../store/index'
import { getMovieList } from './../../api/home'
export default defineComponent({
  name: 'home',
  // props: {
  //   msg: {
  //     type: String,
  //     required: true
  //   }
  // },
  setup: () => {
    const count = ref(0)
    const store = useStore(key)
    let movieList = reactive({ data: [] })
    onMounted(() => {
      getMovieList().then(res => {
        movieList.data = JSON.parse(JSON.stringify(res))
        console.log(movieList.data)
      })
    })
    return { count, store, movieList }
  }
})
</script>

<style lang="scss" scoped>
.homePage {
  padding-bottom: 20px;
  .hotModel {
    .bestMovies {
      background-color: #fff;
      padding: 12px 12px 12px 15px;
      margin-bottom: 10px;
      .partTitle {
        margin: 0;
        font-size: 14px;
        color: #333;
        margin-bottom: 12px;
      }
      .van-swipe {
        .van-swipe__track {
          .van-swipe-item {
            position: relative;
            margin-right: 10px;
            .default-img-bg {
              .wish-bg {
                position: absolute;
                bottom: 21px;
                left: 0;
                right: 0;
                height: 35px;
                background-image: linear-gradient(-180deg,rgba(77,77,77,0),#000);
              }
              .score {
                position: absolute;
                width: 100%;
                display: inline-block;
                bottom: 30px;
                left: 5px;
                z-index: 100;
                color: #faaf00;
                font-size: 11px;
                font-weight: 600;
              }
            }
            .top-bar-name {
              margin: 0;
              font-size: 13px;
              color: #222;
              margin-bottom: 3px;
            }
          }
        }
      }
    }
    .moviesList {
      background-color: #fff;
      .movie-list-item {
        overflow: hidden;
        padding-left: 15px;
        .leftPart-img {
          position: relative;
          width: 64px;
          height: 90px;
          margin-top: 12px;
          float: left;
          img {
            width: 100%;
          }
        }
        .rightPart-info {
          padding: 12px 14px 12px 0;
          margin-left: 74px;
          height: 90px;
          max-height: 90px;
          position: relative;
          border-bottom: 1px solid rgb(233, 228, 228);
          .content {
            padding-right: 5px;
            margin-right: 48px;
            overflow: hidden;
            height: 100%;
            .movie-title {
              font-size: 17px;
              color: #333;
              font-weight: 700;
              padding-right: 5px;
              flex-shrink: 1;
            }
            .movie-actor, .movie-show-info {
              font-size: 13px;
              color: #666;
              margin-top: 6px;
              line-height: 15px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .button-block {
              font-size: 12px;
              position: absolute;
              right: 14px;
              top: 0;
              bottom: 0;
              height: 27px;
              margin: auto;
                .btn-normal {
                  background-color: #f03d37;
                  width: 47px;
                  height: 27px;
                  line-height: 28px;
                  text-align: center;
                  box-sizing: border-box;
                  color: #fff;
                  border-radius: 4px;
                  white-space: nowrap;
                  font-size: 12px;
                  cursor: pointer;
                }
                .btn-pre {
                  background-color: #3c9fe6;
                  width: 47px;
                  height: 27px;
                  line-height: 28px;
                  text-align: center;
                  box-sizing: border-box;
                  color: #fff;
                  border-radius: 4px;
                  white-space: nowrap;
                  font-size: 12px;
                  cursor: pointer;
                }
          }
        }
      }
    }
  }
}
</style>
