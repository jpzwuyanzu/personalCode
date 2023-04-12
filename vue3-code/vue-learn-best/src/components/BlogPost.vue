
<script setup lang="ts">
defineProps<{ test?: string, title? :string }>() // 类型标注来使用props
 //等价于 defineProps({ title: string }) defineProps(['title'])
defineEmits(['enlarge-text'])

</script>
<template>
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">放大</button>
</template>
