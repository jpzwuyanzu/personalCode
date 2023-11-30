<template>
  <van-config-provider  style="height: 100%">
    <div class="layout_container">
      <div class="topHeader">
        <van-nav-bar title="客服列表" safe-area-inset-top/>
      </div>
      <div class="layout_content">
        <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item">
          <div class="cusItem">
            <div class="cusIcon">
              <van-image
                round
                width="100%"
                height="100%"
                fit="cover"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              />
            </div>
            <div class="cusName">章三</div>
            <div class="rightArr">
              <van-icon name="arrow" />
            </div>
          </div>
          </van-cell>
      </van-list>
      </div>
    </div>
  </van-config-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue'
    const list = ref<any[]>([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

</script>

<style lang="scss" scoped>
.layout_container {
  height: 100%;
  .topHeader {
    height: 46px;
  }
  .layout_content {
    height: calc(100% - 46px);
     background: #fff;
     .cusItem {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-startn;
      position: relative;
      .cusIcon {
        width: 40px;
        height: 40px;
      }
      .cusName {
        padding-left: 20px;
        font-size: 16px;
        color: #000;
      }
      .rightArr {
        position: absolute;
        right: 0;
      }
     }
  }
}
</style>
