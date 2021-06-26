// id选择器
// var div = d3.select('#container')
// console.log(div) // 不是常规的
// div.text('千锋深圳').attr('style', 'font-size: 32px')


// var p = d3.select('p')
// p.text('hehe')
// var p = d3.selectAll('p')
// p.text('hehe')
// var p = d3.selectAll('.second').attr('style', 'font-size: 50px')
// p.text('hehe')

// var data = "千锋好程序员"
// var container = d3.select('#container')
// container.selectAll('p')
//   .datum(data) // 绑定单个数据
//   // .text((item, index) => {
//   //   return `第${index}个元素绑定的是${item}`
//   // })
//   .text(data)

// var datalist = [10,20,30]
// var container = d3.select('#container')
// container.selectAll('p')
//   .data(datalist) // 绑定单个数据
//   .text((item, index) => {
//     return `第${index}个元素绑定的是${item}`
//   })

// 添加属性
// var div = d3.select('#container')
// div.selectAll('p')
// .attr('url', 'https://www.baidu.com')
// .style("color", "red")

// var div = d3.select('#container')
// div.selectAll('p')
// .attr('url', (value, index) => {
//   return 'abc'
// })
// .style("color", () => {
//   return 'blue'
// })

// 追加元素
// var div = d3.select('#container')
// div.selectAll('p').text('super')
// div.append('p').text('star')

// 插入操作
// var div = d3.select('#container')
// div.insert('div', "p:nth-child(2)").text(20)


// 删除元素
// var div = d3.select('#container')
// div.select("p:nth-child(2)").remove()

// update() enter() exit()

// update  enter
// var dataset = [3, 6, 9, 12, 15]
// var p = d3.select('#container').selectAll('p')
// var update = p.data(dataset)
// // update.text((value) => 'update' + value)
// var enter = update.enter()
// update.text((value) => 'update' + value)
// enter.append('div').text((value, index) => 'enter' + value)

// update exit
// var dataset = [3, 6]
// var p = d3.select('#container').selectAll('p')
// var update = p.data(dataset)
// // update.text((value) => 'update' + value)
// var exit = update.exit()
// update.text((value) => 'update' + value)
// // exit.text(value => {
// //   console.log(value)
// //   return 'exit'
// // })
// exit.remove() // 删除没有数据的


// 过度动画
// var svg = d3.select('#body')
//   .append('svg')
//   .attr('width', 600)
//   .attr('height', 500)

// svg.append('rect')
//   .attr('fill', 'yellow')
//   .attr('x', 100)
//   .attr('y', 100)
//   .attr('width', 100)
//   .attr('height', 30)
//   .transition()
//   .duration(2000)
//   .delay(300)
//   .attr('width', 300)
//   .attr('height', 90)

// 柱状图
// var datalist = [10, 20, 30, 40, 50, 35]
// var container = d3.select('#body')
// container.selectAll('div').data(datalist)
//   .enter()
//   .append('div')
//   .classed('bar', true)
//   .style('height', (item, index) => {
//     return item * 5 + 'px'
//   })
//   .style('left', (item, index) => {
//     return index * 35 + 'px'
//   })
//   .append('span')
//   .text(item => item)
//   .style('color', item => {
//     if (item > 30) {
//       return 'red'
//     }
//   })

// svg基础
// React ellipse 椭圆  line circle playgon 多边形 polyline 折线

