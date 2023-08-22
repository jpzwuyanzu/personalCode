<template>
  <div class="home_container">
    <PageHeader/>
    <SwipeCom/>
    <Register/>
  </div>
</template>

<script setup>
import PageHeader from '@/components/header/index.vue'
import SwipeCom from '@/components/swipeCom/index.vue'
import Register from '@/components/register/index.vue'

</script>

<style scoped>
.home_container {
  width: 100%;
  height: 100%;
}
</style>
