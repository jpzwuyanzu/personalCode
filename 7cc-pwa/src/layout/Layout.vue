<template>
    <RouterView/>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
    .layout_container {
        width: 100%;
        height: 100%;
        .layout_content {
            height: calc(100% - 50px);
        }
        .layout_tab {
            width: 100%;
            height: 50px;
            position: fixed;
            bottom: 0;
        }
    }
</style>