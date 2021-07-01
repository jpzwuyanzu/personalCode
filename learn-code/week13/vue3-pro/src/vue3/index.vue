<template>
    <div>
        <h1>vue3.0-composition-api</h1>
        <h4>watchEffect</h4>
        <button @click="increment">{{count}}</button>
        <h4>readonly</h4>
        <button @click="testReadOnly">测试只读按钮-{{original.count}} - {{copy.count}}</button>
        <br/>
        <input type="text" v-model="username">
       <button @click="addItem">添加</button>
       <!-- {{ state.list }} -->
       <div>有{{ len }}条数据</div>
       <ul ref="testRef">
           <li v-for="(item, index) of state.list" :key="index">
               {{ item }}
               <button @click="deleteItem(index)">删除</button>
           </li>
       </ul>
       <!-- 父组件调用子组件的地方添加自定义属性，属性的值就是需要传递给子组件的值，如果属性的值是变量， boolearn类型，需要使用绑定属性 -->
       <Child1 title="父传子" :username="username" :flag="false" :num="100" />

       <!-- 子传父 父组件通过自定义事件实现，参数就是子组件传递的值，在子组件的某一个事件中通过context.emit('自定义事件名称'，参数) -->
        <Child @my-event="getChildData" />

       <!-- 非父子组件传值， 中央事件总线传值 -->

       <!-- vuex -->

       <!-- ref  parent -->

       <!-- $listeners  $attrs -->

       <!-- provide inject -->
    </div>
</template>
<script>
import { ref, reactive, computed, readonly, watchEffect, watch, provide } from 'vue'
import Child1 from './child1.vue'
import Child from './child.vue'
import { ThemeSymbol } from './sym'
export default {
  components: {
    Child1,
    Child
  },
  setup () {
    const testRef = ref('')
    console.log(testRef)
    // provide - inject
    provide(ThemeSymbol, 'dark111')
    const username = ref('')
    const state = reactive({
      list: ['a', 'b']
    })

    // readonly
    const original = reactive({ count: 0 })
    const copy = readonly(original)
    const testReadOnly = () => {
      original.count++
      copy.count++
    }
    // watchEffect
    const count = ref(100)
    const obj = reactive({
      name: 'aaa'
    })
    const increment = () => {
      count.value++
      obj.name += count.value
    }
    watchEffect(() => {
      console.log(count.value)
    })
    // watch -ref
    // watch(count, (newCount, oldCount) => {
    //   console.log(newCount, oldCount)
    // })
    // // watch -reactive
    // watch(() => obj.name, (newName, oldName) => {
    //   console.log(newName, oldName)
    // })
    // 侦听多个数据源
    watch([count, () => obj.name], ([newCount, newName], [oldCount, oldName]) => {
      console.log(newCount, oldCount)
      console.log(newName, oldName)
    })

    // methods
    const addItem = () => {
      state.list.push(username.value)
      username.value = ''
    }
    const deleteItem = (index) => {
      state.list.splice(index, 1)
    }
    // computed
    const len = computed(() => state.list.length)

    const getChildData = (data) => {
      console.log(`接收到子组件的数据${data}`)
    }

    return {
      username,
      state,
      addItem,
      deleteItem,
      len,
      testReadOnly,
      original,
      copy,
      count,
      increment,
      getChildData,
      testRef
    }
  }
}
</script>
