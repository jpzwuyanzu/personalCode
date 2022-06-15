<template>
  <a-row>
    <a-col :span="12">
      <a-statistic title="Active Users" :value="112893" style="margin-right: 50px" />
    </a-col>
    <a-col :span="12">
      <a-statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
      <button @click="linkPage">跳转</button>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const appRouter = useRouter()
const linkPage = () => {
  console.log(appRouter)
  appRouter.push({ name: 'personalTest' })
}
</script>


