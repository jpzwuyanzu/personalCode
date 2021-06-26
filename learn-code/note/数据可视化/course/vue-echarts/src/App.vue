<template>
  <div id="app" style="width:1000px;height:700px">
    <!-- <Pie /> -->
    <Polar />
  </div>
</template>

<script>
// import Pie from './components/Pie.vue'
import Polar from './components/Polar.vue'

export default {
  name: 'App',
  components: {
    // Pie,
    Polar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
