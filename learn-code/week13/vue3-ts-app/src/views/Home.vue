<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
interface Book {
  title: string
  author: string
  year: number
}
export default defineComponent({
  // data() {
  //   return {
  //     count: 0,
  //      book: {
  //       title: 'Vue 3 Guide',
  //       author: 'Vue Team',
  //       year: 2020
  //     } as Book
  //   }
  // }
  setup() {
    const data = {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      }
    // const book: Book = reactive(data) as Book
    // const book: Book = reactive(data)
    const book = reactive<Book>(data)
    const count = ref(100)
    // console.log(count.value.splite(''))  ref会自动推断
  }
});
</script>
