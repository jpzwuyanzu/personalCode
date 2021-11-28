# react中的setState是模拟异步操作，为了性能优化

# react中的事件机制是自己封装了一套事件机制代替了原生事件

# react中的状态改变判断条件是依据于isBatchingUpdates为true还是false

# 当在setTimeout和原生事件中修改状态的时候，state是直接更新，相当于同步更新
# 如果是在react合成事件以及生命周期中修改状态，isBatchingUpdates是true，会走模拟异步那一套处理逻辑




# useState()状态钩子中修改状态的函数饼不会像class中setState一样会合并对象，需要通过扩展运算符来实现


