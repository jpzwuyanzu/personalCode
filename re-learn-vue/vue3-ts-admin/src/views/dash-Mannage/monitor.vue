<template>
  <div class="monitor-container">
      <div class="static-container left-aprt">
          <div id="myMonitorEcharts" :style="{ width: '100%', height: '300px' }"></div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted } from 'vue'
 /// 声明定义一下echart
    let echart = echarts;
    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      echart.dispose;
    });
	
    // 基础配置一下Echarts
    const  initChart = () =>  {
      let chart = echart.init((document.getElementById("myMonitorEcharts") as HTMLDivElement), "dark");
      // 把配置和数据放这里
      chart.setOption({
  title: {
    text: 'World Population'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  series: [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
});
      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    }
</script>
<style lang="scss" scoped>
.monitor-container {
    display: flex;
    flex-direction: row;
    .static-container {
        width: 100%;
    }
}
</style>