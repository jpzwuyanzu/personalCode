<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('')
</script>
<template>
    <p>Current component B</p>
    <span>messag is {{ msg }}</span>
    <input v-model="msg" type="text">
</template>