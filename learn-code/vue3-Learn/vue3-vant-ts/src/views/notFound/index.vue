<template>
  <h1>404页面</h1>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'login',
  // props: {
  //   msg: {
  //     type: String,
  //     required: true
  //   }
  // },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped>
</style>
