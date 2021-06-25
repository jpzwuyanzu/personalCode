<template>
    <div>
        <h2>Props</h2>
    </div>
</template>
<script>
import { toRefs, toRef } from 'vue'
export default {
    props: {
        title: String
    },
    setup(props, context) {
        //因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。
        // console.log(props.title)
        

        //如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作：
        const { title } = toRefs(props)
        //如果 name 是可选的 prop，则传入的 props 中可能没有 name 。
        //在这种情况下，toRefs 将不会为 name 创建一个 ref 。你需要使用 toRef 替代它：
        const name = toRef(props, 'name')
        console.log(title.value)
        console.log(name.value) // undefined

        // contex 暴露三个属性
        // Attribute (非响应式对象)
        console.log(context.attrs)

        // 插槽 (非响应式对象)
        console.log(context.slots)

        // 触发事件 (方法)
        console.log(context.emit)

    }
}
</script>