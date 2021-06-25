<template>
  <router-view></router-view> 
</template>

<script setup>

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
/*进度条*/
  #nprogress .bar {
    height: 3px;
    background: #fe9600;
    z-index: 1000;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px #fe9600, 0 0 5px #fe9600;
  }
</style>
