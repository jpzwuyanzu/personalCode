import React from 'react'
import ReactECharts from 'echarts-for-react';

export default class App extends React.Component {

  getOption = () => {
    const option = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar'
      }]
  }
  return option
  }

  render() {
    return (
      <div className="App">
        <ReactECharts
        option={this.getOption()}
        notMerge={true}
        lazyUpdate={true}
        ></ReactECharts>
      </div>
    )
  }
}