<template>
    <div class="sys-Index">
      <div id="mycharts" ref="myRef" class="chart-box" />
      <div id="mycharts2" ref="myRef" class="chart-box" />
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const iniT = () => {
   const myChart = echarts.init(document.getElementById('mycharts'));
   const myChart2 = echarts.init(document.getElementById('mycharts2'))
    myChart.setOption({
      title: {
        text: '本月数据统计'
      },
      tooltip: {},
      legend: {
        data: ['任务数量']
      },
      xAxis: {
        data: ['javascript', 'vue', 'ts', 'react', 'nginx']
      },
      yAxis: {},
      series: [
        {
          name: '任务数量',
          type: 'bar',
          data: [5, 20, 36, 10, 10]
        }
      ]
    })

    myChart2.setOption({
    title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['2011年', '2012年']
    },
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
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
})
}

onMounted(() => {
  iniT()
})
</script>

<style lang="scss" scoped>
.sys-Index {
  display: flex;
  flex-direction: row;
  .chart-box{
    flex:1;
    height: 600px;
}

}
</style>