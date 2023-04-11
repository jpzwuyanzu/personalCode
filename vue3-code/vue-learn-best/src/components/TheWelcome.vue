<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect, onMounted } from 'vue';
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import ButtonCounter from './ButtonCounter.vue'

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
  </div>
</template>

<style  scoped>
.testClass {
  color: var(--vt-c-text-test-1);
}
</style>
