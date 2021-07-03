<template>
  <div>
    <input type="text" v-model="username" @keydown.enter="addItem">
    <button @click="addItem">添加</button>
    <button @click="deletItem(index)">删除</button>
    <ul>
      <li v-for="(item, index) of list" :key="index">{{item}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from './store/index'
export default defineComponent({
  setup() {
    const username = ref('')
    const store = useStore(key)
    const list = computed(() => store.state.list)
    const addItem = () => {
      store.dispatch('changeList', username.value)
    }
    const deletItem = (index) => {
      store.dispatch('deleList', index)
    }
    console.log(store)
    return {
      list,
      addItem,
      username,
      deletItem
    }
  }
})
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
