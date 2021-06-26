<template>
  <div ref="pieContainer" style="width: 500px;height:500px">
    1111
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'pie',
  data () {
    return {
      title: '某个站点用户访问来源',
      data: []
    }
  },
  methods: {
    initBar () {
      var myCharts = echarts.init(this.$refs.pieContainer)
      var option = {
        title: {
          text: '饼图',
          link: 'https://www.baidu.com',
          suntext: 'demo'
        },
        legend: {
          data: ['销量'],
          show: true,
          right: 20
        },
        xAxis: {
          data: this.title,
          show: true
        },
        yAxis: {
          show: true
        },
        series: [
          {
            name: '销量',
            type: 'pie',
            data: this.data,
            radius: '55%',
            center: ["50%", "50%"]
          }
        ]
      }
      myCharts.setOption(option)
    }
  },
  mounted () {
    fetch('http://localhost:9000/pie')
    .then(res => res.json())
    .then(res => {
      this.title = res.data.title
      this.data = res.data.list
      this.initBar()
    })
  }
}
</script>