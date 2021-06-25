

# 旧版本生命周期

## 1,初始化阶段 -挂载阶段
constructor 
componentWillMount() -废弃
render()
componentDidMount()

## 2，运行时阶段 -更新阶段
componentWillReceiveProps() -废弃

shouldComponentUpdate() - react提升性能关键

componentWillUpdate() -废弃

render()

compoenntDidUpdate()


## 3， 销毁阶段 - 卸载

componentWillUnmount()

## 4，错误处理
compponentDidCatch()

旧版本生命周期有10个或者是11个


# 新版本生命周期 2018.4.16  react-16.3版本更新

## 1,初始化阶段 -挂载阶段
 
 constructor()
 
 static getDerivedStateFromProps(props,state)

render()

 componentDidMount()

## 2，运行时阶段 -更新阶段
 static getDerivedStateFromProps(props,state)

 shouldComponentUpdate() 默认值为true 提升性能的关键，控制是否触发render函数
 使用PureComponent 会自动判断自组件随着父组件更新 后期使用PureComponent代替Component 相当于内置优化处理（内置shouldComponentupdate）

 render()

 getSnapshotBeforeUpdate(prevProps,prevState)

 componentDidUpdate()


## 3， 销毁阶段 - 卸载
componentWillUnmount()

## 4，错误处理

static getDerivedStateFromError()

componentDidMount()

新版本生命周期钩子10，11，12个都对

常用的钩子函数： constructor()  render() componentDidMount() componentDidUpdate()




