<template>
    <div>
       {{ themeValue }}
       <ul>
           <li>{{ title }}</li>
           <li>{{ username }}</li>
           <li>{{ flag }}</li>
           <li>{{ num }}</li>
           <li>{{ test }}</li>
       </ul>
    </div>
</template>
<script>
import { inject } from 'vue'
import { ThemeSymbol } from './sym'
export default {
  // 在子组件定义的地方，添加props属性
  // props数组的写法, 数组的元素就是父传子自定义的属性名
  // props: ['title', 'username', 'flag', 'num'],
  // props 对象的写法- -对象的key值为自定义的属性名，value的值为数据类型
  // props: {
  // title: String,
  // username: String,
  // flag: Boolean,
  // num: Number
  // },
  // 对象写法二 对象的key值为属性名，value为新对象
  // 新对象可以添加type， default， required，validator
  // 渲染时使用自定义属性名即可
  props: {
    title: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    //  validator: (value) => {
      //  return value.length > 4
    //  }
    },
    num: {
      type: Number,
      required: true
    },
    flag: {
      type: Boolean,
      required: true
    },
    test: {
      type: String,
      default: '我是默认的'
    }
  },
  setup (props) {
    console.log(props)
    // provide - inject
    const themeValue = inject(ThemeSymbol)
    return {
      themeValue
    }
  }
}
</script>
