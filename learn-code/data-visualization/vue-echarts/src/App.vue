<template>
  <div id="app">
    <Pie/>
  </div>
</template>

<script>
import Pie from '@/Pie.vue'
export default {
  name: 'App',
  components: {
    Pie
  }
}
</script>

<style>
html, body ,#app {
        width: 100%;
        height: 100%;
        padding: 0;
        margin:0;
    }
</style>
