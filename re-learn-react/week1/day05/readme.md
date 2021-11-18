# 旧版本生命周期 （10个或者11个都对，render重复了）

## 1， 初始化阶段，-挂在阶段
constructor

componentWillMount() --废弃

render ()

componentDidMount ()

## 2， 运行时阶段--更新阶段

cmponentWillReceiveProps () -废弃

shouldComponentUpdate () - react提升性能的关键

componentWillUpdate() - 废弃

render（)

componentDidUpdate()

## 3，销毁阶段， -- 卸载

componentWillUnmount()


## 4， 错误处理

componentDidCatch()


# 新版本生命周期 2018/4/16   --- react 16.3 统计为10个，11个，12个都对  https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/


## 1， 初始化阶段，-挂在阶段
constructor()

render()

componentDidMount()


## 2， 运行时阶段--更新阶段

shouldComponenntUpDate()

render()

getSnapshotBeforeUpdate()

componentDidUpdate()

## 3，销毁阶段， -- 卸载


## 4， 错误处理



## 使用较多的生命周期

componentDidMount()

componentDidUpdate()






