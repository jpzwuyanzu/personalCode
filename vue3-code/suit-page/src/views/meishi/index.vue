<template >
    <div>
        meishi
        <button @click="linkNow">详情</button>
    </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const appRoute = useRouter()
console.log(appRoute)
const linkNow = () => {
    appRoute.push('/meishi/100')
}
</script>