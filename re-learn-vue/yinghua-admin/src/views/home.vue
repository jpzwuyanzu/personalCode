<template>
  <div class="main_page_container">
    <div class="upApp_statics">
      <a-row :gutter="16">
        <a-col :span="6">
          <div style="padding-left: 12px; padding-right: 12px">
            <div className="baseStyle wechat">
              <WechatOutlined />
              <div>
                <span>136348</span>
                <div>微信用户</div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div style="padding-left: 12px; padding-right: 12px">
            <div className="baseStyle qq">
              <QqOutlined />
              <div>
                <span>136348</span>
                <div>QQ用户</div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div style="padding-left: 12px; padding-right: 12px">
            <div className="baseStyle ding">
              <DingdingOutlined />
              <div>
                <span>136348</span>
                <div>钉钉用户</div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div style="padding-left: 12px; padding-right: 12px">
            <div className="baseStyle weibo">
              <WeiboOutlined />
              <div>
                <span>136348</span>
                <div>微博用户</div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
   <div class="static_conatiner">
    <div id="main_static_card"></div>
   </div>
  </div>
</template>
<script setup lang="ts">
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  WechatOutlined,
  QqOutlined,
  DingdingOutlined,
  WeiboOutlined,
} from "@ant-design/icons-vue";
import { onMounted } from "vue";
import * as echarts from "echarts";

const initStaticFunc = () => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("main_static_card") as HTMLDivElement);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "App下载数据统计",
      },
      tooltip: {},
      xAxis: {
        data: ["微信", "QQ", "钉钉", "微博"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10],
        },
      ],
    });
}

onMounted(() => {
  initStaticFunc()
});
</script>
<style lang="scss">
.main_page_container {
  .upApp_statics {
    /*首页样式*/
    .static-main-body {
      margin-bottom: 60px;
    }
    .baseStyle {
      display: flex;
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 13px 0 rgb(228 228 228 / 60%);
    }
    .wechat {
      background-color: #70ca63;
    }
    .qq {
      background-color: #967adc;
    }
    .ding {
      background-color: #5d5dfd;
    }
    .weibo {
      background-color: #fb452d;
    }

    .wechat > span,
    .qq > span,
    .ding > span,
    .weibo > span {
      font-size: 60px;
      color: white;
    }
    .wechat > div,
    .qq > div,
    .ding > div,
    .weibo > div {
      font-size: 18px;
      color: white;
      margin-left: 20px;
    }
  }
  .static_conatiner {
    width: 100%;
    padding-top: 35px;
    #main_static_card {
    width: 100%;
    height: 400px;
  }
  }
}
</style>
