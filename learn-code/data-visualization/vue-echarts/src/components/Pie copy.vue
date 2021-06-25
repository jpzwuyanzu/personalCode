<template>
    <div ref="container" class="container"></div>
</template>

<script>
// import Echarts from 'echarts'  //这个会报错
const Echarts = require('echarts') //目前版本是5，需要使用commonjs规范方式引入
export default {
    data () {
        return {
            title: '',
            data: []
        }
    },
    methods: {
        initPie () {
            //初始化
            var myChart = Echarts.init(this.$refs.container)

            const option = {
                 title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    // left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [{
                    type: 'pie',
                    radius: '50%',
                    data: this.data,
                    // center:['50%', '50%'],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }

            myChart.setOption(option)
        }
    },
    mounted() {
        fetch('http://localhost:9000/pie')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.title = res.data.title;
            this.data = res.data.list;
            this.initPie()
        })
        
    },
}
</script>
<style scoped>
    .container {
        width: 800px;
        height: 600px;

    }
</style>