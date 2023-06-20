<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script setup>
import axios from 'vue-axios'
//请修改成可用的测试API，对应vite.config.js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
