<template>
    <div class="layout_container">
        layout
        <van-button type="primary">898989</van-button>
        <router-view/>
    </div>
</template>
<script setup lang="ts">
console.log('res')
</script>
<style lang="scss" scoped>
.layout_container {
    height: 80%;
    background: yellowgreen;
}
</style>