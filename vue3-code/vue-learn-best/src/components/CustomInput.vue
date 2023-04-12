
<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>
<template>
    <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
