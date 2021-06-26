import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'; 
export default class App extends Component {
  getOption () {
    var data = [];

    for (var i = 0; i <= 100; i++) {
        var theta = i / 100 * 360;
        var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
        data.push([r, theta]);
    }

    const option = {
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['line']
      },
      polar: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        data: data
      }]
    };
    return option
  }
  render() {
    return (
      <ReactEcharts
  option={this.getOption()}
  notMerge={true}
  lazyUpdate={true}/>
    )
  }
}
