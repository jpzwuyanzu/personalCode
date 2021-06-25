<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
import Layout from './views/layout/index'
export default {
  components:{Layout},
    data() {
        return {
            
        }
    }
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin:0;
  padding:0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
