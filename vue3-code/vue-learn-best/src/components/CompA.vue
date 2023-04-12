<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
    <p>Current Componnet A</p>
    <span>count: {{ count }}</span>
    <button @click="count++">+</button>
</template>