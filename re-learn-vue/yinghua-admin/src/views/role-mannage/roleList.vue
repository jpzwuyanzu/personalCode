<template>
    <span>角色列表</span>
</template>
<script setup lang="ts">
import { onActivated, onDeactivated } from "vue";
onActivated(() => {
    console.log('激活')
})
onDeactivated(() => {
    console.log('停止使用')
})
</script>