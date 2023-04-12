<script setup lang="ts">
// defineProps(['firstName', 'lastName'])
defineProps({
    firstName: String,
    lastName: String
})
defineEmits(['update:firstName', 'update:lastName'])
</script>
<template>
    <input :value="firstName" @input="$emit('update:firstName', ($event.target as HTMLInputElement).value)" type="text">
    <input :value="lastName" @input="$emit('update:lastName', ($event.target as HTMLInputElement).value)" type="text">
</template>