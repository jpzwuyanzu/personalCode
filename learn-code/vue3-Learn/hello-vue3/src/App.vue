<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld/>
  <MyBook title="121212"/>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import MyBook from './components/myBook.vue'

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
  margin-top: 60px;
}
</style>
