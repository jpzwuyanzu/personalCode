<template>
  <div class="homePage">
  <h1>home页面</h1>
  <p>num: {{store.state.num}}</p>
  <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'home',
  props: {
    msg: {
      type: String,
      // required: true
    }
  },
  setup: () => {
    const count = ref(0)
    const store = useStore()
    console.log(store)
    return { count, store }
  }
})
</script>

<style scoped>
.homePage {
  height: 10000px;
}
</style>
