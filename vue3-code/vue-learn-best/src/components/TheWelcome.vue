<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect, onMounted,shallowRef } from 'vue';
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import ButtonCounter from './ButtonCounter.vue'
import BlogPost from './BlogPost.vue'
import CustomInput from './CustomInput.vue'
import UserName from './UserName.vue'
import ComA from './CompA.vue'
import ComB from './CompB.vue'

const author = reactive({
  name: 'tony',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
const message = ref('');
const todoId = ref('0')
const count = reactive({ num: 0 });
const tempRef = ref(null)
const posts = ref([
{ id: 1, title: 'My journey with Vue' },
{ id: 2, title: 'Blogging with Vue' },
{ id: 3, title: 'Why Vue is so fun' }
])
const postFontSize = ref(1);
const cusMessage = ref('hello')
const first = ref('li')
const last = ref('qiang')
const show = ref(false)
const currenCom = shallowRef(ComA)
//计算属性:自动追踪响应式依赖
const publishedBooks = computed(() => {
  return author.books.length > 0 ?  'YES': 'No'
})

// watch 监听器
// watch可以监听一个ref对象
// watch可以监听一个getter函数
// watch可以监听一个多个数据源的数组
//可以加一个deep
// immediate: true 会立即执行一次
watch(count, (newVal) => {
  console.log(newVal)
})
watch(() => count.num, (newVal) => {
  console.log(newVal)
})

//watcheffect 在最开始会执行一次, 不需要写入监听数据源头todoId， 当todoId变化，监听就会执行
watchEffect(async() => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
  const tempData = await response.json()
})

onMounted(() => {
  if(tempRef.value) {
    console.log(tempRef.value)
  }
})


</script>

<template>
  <div>
    <p>Has published books:</p>
    <span>{{ publishedBooks }}</span>
    <div class="formInput">
      <p ref="tempRef">message is {{ message }}</p>
      <input v-model="message" type="text">
    </div>
    <ButtonCounter/>
    <ButtonCounter/>
    <ButtonCounter/>
    <div :style="{ fontSize: postFontSize+'em' }">
      <BlogPost v-for="item in posts" :key="item.id" :title="item.title" @enlarge-text="postFontSize+=0.1"/>
    </div>
    <CustomInput v-model="cusMessage"/>{{ cusMessage }}
    <!-- 多个v-model的使用以及制定参数和事件名称 -->
    <UserName v-model:firstName="first" v-model:lastName="last"/>{{ first }}-{{ last }}
    <!-- 内置组件 Transition  -->
    <div>
      <button @click="show = !show">toggle</button>
      <transition name="slide-fade">
        <p v-if="show">hellow</p>
      </transition>
    </div>
    <!-- keepAlive缓存组件 -->
    <div class="demo">
      <label><input type="radio" v-model="currenCom" :value="ComA" /> A</label>
     <label><input type="radio" v-model="currenCom" :value="ComB" /> B</label>
      <KeepAlive>
        <component :is="currenCom"></component>
      </KeepAlive>
    </div>
  </div>
</template>

<style  scoped>
.testClass {
  color: var(--vt-c-text-test-1);
}
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
