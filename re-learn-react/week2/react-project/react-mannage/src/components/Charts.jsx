import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts'

const Charts = () => {
    const chartRef = useRef()
    const options =  {
        title: {
          text: '用户统计'
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
            name: '2021',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2022',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      }

    useEffect(() => {
        //创建echarts实例
        const chart = echarts.init(chartRef.current)
        chart.setOption(options)
        window.addEventListener("resize", function() {
            chart.resize()
        })

        //组件卸载
        return () => {
            chart.dispose()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
        <div style={{ width: "100%", height: "400px" }} ref={ chartRef }></div>
        </>
    );
}

export default Charts;
