<script>
import { ref, reactive, watch, watchEffect, computed, unref } from 'vue'
export default {
  props: {
    name: String
  },
  setup(props, context) {
    // props是响应式的，不可以解构
    const count = ref(0)
    const obj = reactive({ foo: 'bar' })
    console.log(props.name)
    watchEffect(() => {
      console.log('name is:' + props.name)
      console.log(context)
    })

    //响应式Api
    const test = reactive({ name: 'china' }) //只做为对象的响应式
    console.log(test.name)
    const test1 = ref(0) //既可以式扁平对象，也可以式对象,如果式对象回先使用reactive转换
    console.log(test1.value)

    //computed 
    const count1 = ref(1)
    const plusOne = computed({
      get: () => count1.value + 1,
      set: (val) => {
        count.value = val - 1
      }
    })
    // computed传入get/set可以返回一个可以读写的对象
    plusOne.value = 1 
    console.log(count1.value) // 0

    //watchEffect, 立即执行函数，当内部依赖变化，会重新执行
    const test3 = ref(0)
    const stopWatch = watchEffect(() => console.log('watchEffect:' + test3.value))
    setTimeout(() => {
      test3.value ++
      if(test3.value === 1) {
        console.log('暂停监听')
        stopWatch()
      }
    }, 100)

    //watch监听
    const test4 = reactive({ count: 0 })
    // watch(
    //   () => test4.count,
    //   (count, prevCount) => {
    //     console.log('count:' + count)
    //     console.log('prevCount:' + prevCount)
    //   }
    // )

     //unref语法糖 val = isRef(val) ? val.value : val 的语法糖.
    const test5 = ref(9)
    console.log(unref(test5))






    //暴露到模版中
    return {
      count,
      obj
    }
},
}
</script>
<template>
  <div>{{ count }} {{ obj.foo }}</div>
</template>
<style scoped>
a {
  color: #42b983;
}
</style>
