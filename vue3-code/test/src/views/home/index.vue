<template>
  <div class="home_container">
    <div class="headerPart">
      <div class="titleItem" v-for="(item, inx) in headerList" key="inx">
        {{ item.name }}
      </div>
    </div>
    <div class="contentPart">
      <div class="playerPart">
        <div id="mse"></div>
      </div>
      <div class="saveBtn">保存到桌面 观看更多视频</div>
      <div class="timeBtnArr">
        <div @click="switchToDetailTime(10)">00:10</div>
        <div @click="switchToDetailTime(20)">00:20</div>
        <div @click="switchToDetailTime(30)">00:30</div>
        <div @click="switchToDetailTime(40)">00:40</div>
      </div>
    </div>

    <div class="footerPart">
      <div class="labelLine">精彩推荐</div>
      <div class="videoList">
        <div
          class="videoItem"
          v-for="(itm, index) in reVideoList"
          key="index"
          @click="playVideoNow(index)"
        >
          <img :src="itm.image" alt="" />
          <div class="videoTitle">{{ itm.title }}</div>
        </div>
      </div>
    </div>
    <div class="downloadPart">
      <div class="downloadTips">
     <div class="leftPart">
      <img class="leftIcon" src="../../assets/001.png" alt="">
     <div class="centerDesc">
      <p>产品名称</p>
      <p>产品宣传标语</p>
     </div>
     </div>
     <div class="downLoadBtn" @click="dialogVisible = !dialogVisible">保存到桌面</div>
    </div>
    <p class="bottomTips">建议使用CHrome/ALook/edge/夸克/uc浏览器</p>
    </div>
    <!-- 下载弹框 -->
    <div v-if="dialogVisible" class="downloadDialog">
     <div class="dialogContent">
      <div class="title">温馨提示</div>
      <div class="content">
        <p>永久地址www.baidu.com</p>
        <p>APP保存到桌面 快捷入口</p>
      </div>
      <div class="btn-group">
        <div class="lBtn" @click="link('')">保存到桌面</div>
        <div class="rBtn" @click="link('https://www.baidu.com')">立即下载</div>
      </div>
     </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Player from "xgplayer";
import HlsPlayer from "xgplayer-hls";
import "xgplayer/dist/index.min.css";
import { ref, onMounted } from "vue";
const msePlayerRef = ref<any>(null);
const dialogVisible = ref<boolean>(false);
const currentVideoIndex = ref<number>(0);
const headerList = ref<any>([
  {
    name: "标题",
    id: 1,
  },
  {
    name: "标题",
    id: 2,
  },
  {
    name: "标题",
    id: 3,
  },
  {
    name: "标题",
    id: 4,
  },
  {
    name: "标题",
    id: 5,
  },
  {
    name: "标题",
    id: 6,
  },
  {
    name: "标题",
    id: 7,
  },
  {
    name: "标题",
    id: 8,
  },
  {
    name: "标题",
    id: 9,
  },
  {
    name: "标题",
    id: 10,
  },
  {
    name: "标题",
    id: 11,
  },
  {
    name: "标题",
    id: 12,
  },
]);
const reVideoList = ref<any>([
  {
            "id": "1",
            "title": "标题1",
            "image": "https://www.haitu.tv/upload/vod/20230429-2/d16d885912160603f7be51844b9c737a.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/76762beb45c79951cf49d40b6bca77d6aaf720e46c1579ed4dffce395884fb289921f11e97d0da21.m3u8"
        },
        {
            "id": "2",
            "title": "标题2",
            "image": "https://www.haitu.tv/upload/vod/20220730-1/e642a9364507a81d4ab3b3b492ea28bc.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/7edfd47924637736ec02cb424a0930fb318840a1f7c6c90fadc734b8ecc9e9f19921f11e97d0da21.m3u8"
        },
        {
            "id": "3",
            "title": "标题3",
            "image": "https://www.haitu.tv/upload/vod/20230430-1/11937cbf438adcc2e4d7191ed14e98ab.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/2216440987dd8f084c3599a72cf29410ff155f84381915bba55989e7b829033a9921f11e97d0da21.m3u8"
        },
        {
            "id": "4",
            "title": "标题4",
            "image": "https://www.haitu.tv/upload/vod/20230430-3/e9e97880021ee107dfe07d790498f378.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/3eb85c915e68688f759b8db6f37be15221a8052dccff5ebf200b422b7a7261e39921f11e97d0da21.m3u8"
        },
        {
            "id": "5",
            "title": "标题5",
            "image": "https://www.haitu.tv/upload/vod/20230430-25/5f5b5ce7b264d0028a815f1985814e58.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/d30f81cf12682bdac819d14dc0b945bdabaa1bf6f391771dc0ca187982fc224e9921f11e97d0da21.m3u8"
        },
        {
            "id": "6",
            "title": "标题6",
            "image": "https://www.haitu.tv/upload/vod/20230319-7/10d39433a430723db6c07870d72ac9f1.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/ec2445bbbf267a97271ab4aca2e9ae5af86b4bea8956ac6db9f127dd7865863a9921f11e97d0da21.m3u8"
        },
        {
            "id": "7",
            "title": "标题7",
            "image": "https://www.haitu.tv/upload/vod/20230323-1/61b327474a24cf05fe3699e54f09f886.webp",
            "video": "https://m3u.haiwaikan.com/xm3u8/87179e9173db39d9bf5d766685e9bd9d62e3e6e7e3bd3c3b0306eec4e1e8787b9921f11e97d0da21.m3u8"
        },
        {
            "id": "8",
            "title": "标题8",
            "image": "https://www.haitu.tv/upload/vod/20230430-5/51dff97f7ffc3f4fcb349cfd4d440207.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/2e30aff0e15a86f1789f61bb79fc709b8458a039d2fb37e113015281d8d36b7f9921f11e97d0da21.m3u8"
        },
        {
            "id": "9",
            "title": "标题9",
            "image": "https://img.liangzipic.com/upload/vod/20221021-1/99b26389525118e26760c5832d312302.jpg",
            "video": "https://m3u.haiwaikan.com/xm3u8/c334c822c4fe79989266090024080c1e013f617b9eb98510880426c70ff7d2169921f11e97d0da21.m3u8"
        },
]);
const initPlayer = (inx: number, time = 0) => {
  // 如果存在实例先销毁，再初始化
  msePlayerRef &&
    msePlayerRef.value &&
    msePlayerRef.value.destory &&
    msePlayerRef.value.destory();
  //初始化实例
  msePlayerRef.value = new Player({
    id: "mse",
    autoplay: true,
    volume: 0.3,
    url: reVideoList.value[inx]["video"],
    poster: reVideoList.value[inx]["image"],
    playsinline: true,
    thumbnail: {
      pic_num: 44,
      width: 160,
      height: 90,
      col: 10,
      row: 10,
      urls: [reVideoList.value[inx]["image"]],
    },
    danmu: {
      comments: [
        {
          duration: 15000,
          id: "1",
          start: 3000,
          txt: "长弹幕长弹幕长弹幕长弹幕长弹幕",
          style: {
            //弹幕自定义样式
            color: "#ff9500",
            fontSize: "20px",
            border: "solid 1px #ff9500",
            borderRadius: "50px",
            padding: "5px 11px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },
      ],
      area: {
        start: 0,
        end: 1,
      },
    },
    height: window.innerHeight,
    width: window.innerWidth,
    plugins: [HlsPlayer],
    HlsPlayer: {
      maxBufferLength: 50,
      minBufferLength: 10,
    },
  });
};
const playVideoNow = (inx: number) => {
  currentVideoIndex.value = inx
  initPlayer(inx, 0)
}
const link = (links: any) => {
  dialogVisible.value = false
  if(links) window.open(links, '_blank')
  if(!links) {
    console.log('909090')
  }
} 
const switchToDetailTime = (time: number) => {
  msePlayerRef.value.seek(time)
}

onMounted(() => {
  initPlayer(0, 0);
  currentVideoIndex.value = 0
});
</script>
<style lang="scss" scoped>
.home_container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  background-color: #000;
  .headerPart {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: space-between;
    height: 15%;
    box-sizing: border-box;
    .titleItem {
      width: 23%;
      text-align: center;
      background: #222222;
      color: #fff;
      margin-bottom: 10px;
      padding: 10px 5px;
      border-radius: 10px;
    }
  }
  .contentPart {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 45%;
    padding: 10px 20px;
    box-sizing: border-box;
    .playerPart {
      width: 100%;
      height: 80%;
      #mse {
        width: 100% !important;
        height: 100% !important;
      }
    }
    .saveBtn {
      width: 70%;
      height: 50px;
      background: skyblue;
      line-height: 50px;
      text-align: center;
      padding: 10px;
      border-radius: 20px;
      font-weight: 600;
      margin-top: 20px;
    }
    .timeBtnArr {
      width: 70%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding-top: 20px;
      div {
        padding: 5px 10px;
        border-radius: 10px;
        background: skyblue;
      }
    }
  }
  .footerPart {
    padding: 0px 20px;
    padding-top: 30px;
    height: 40%;
    box-sizing: border-box;
    .labelLine {
      color: #fff;
      font-size: 30px;
      height: 40px;
    }
    .videoList {
      height: calc(100% - 40px);
      box-sizing: border-box;
      overflow-y: scroll;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 20px;
      .videoItem {
        width: 46%;
        border-radius: 20px;
        background: #222222;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 200px;
        }
        .videoTitle {
          width: 100%;
          color: white;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          padding: 4px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  .downloadPart {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .downloadTips {
    width: 90%;
    height: 150px;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    .leftPart {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }
    .centerDesc {
      padding-left: 20px;
      p {
        padding: 0;
        margin: 0;
      }
    }
    }
    
    .downLoadBtn {
      padding: 10px 20px;
      background: skyblue;
      border-radius: 10px;
    }
  }
  .bottomTips {
    color: white;
  }
  }
  .downloadDialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .dialogContent {
      width: 500px; /* 设置弹框宽度 */
    height: 350px; /* 设置弹框高度 */
    background-color: #fff; /* 弹框背景颜色 */
    border-radius: 15px; /* 弹框圆角 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
    .title {
      padding: 10px 10px;
      text-align: center;
      font-size: 30px;
      font-weight: 600;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        text-align: center;
      }
    }
    .btn-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding-top: 30px;
      div {
        padding: 10px 20px;
        width: 120px;
        border-radius: 15px;
        text-align: center;
      }
      .lBtn {
        background: gray;
      }
      .rBtn {
        background: skyblue;
      }
    }
    }
  }
}
</style>
