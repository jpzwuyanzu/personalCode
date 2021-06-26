<template>
  <v-chart :options="polar"/>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    function func(x) {
      x /= 10;
      return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50
    }

    function generateData() {
      let data = []
      for (let i = -200; i <= 200; i += 0.1) {
        data.push([i, func(i)])
      }
      return data
    }

    return {
      polar: {
        animation: false,
        grid: {
          top: 40,
          left: 50,
          right: 40,
          bottom: 50
        },
        xAxis: {
          name: 'x',
          minorTick: {
            show: true
          },
          splitLine: {
            lineStyle: {
              color: '#999'
            }
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        yAxis: {
          name: 'y',
          min: -100,
          max: 100,
          minorTick: {
            show: true
          },
          splitLine: {
            lineStyle: {
              color: '#999'
            }
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: '#ddd'
            }
          }
        },
        dataZoom: [{
          show: true,
          type: 'inside',
          filterMode: 'none',
          xAxisIndex: [0],
          startValue: -20,
          endValue: 20
        }, {
          show: true,
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: [0],
          startValue: -20,
          endValue: 20
        }],
        series: [
          {
            type: 'line',
            showSymbol: false,
            clip: true,
            data: generateData()
          }
        ]
      }
    }
  }
}
</script>