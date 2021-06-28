<template>
<div class="defaultLayout">
    <div class="pageHeader">
        <div class="headerNav">头部</div>
    </div>
    <div class="pageContent">
        <router-view></router-view>
    </div>
    <div class="pageFooter">
        <div class="bottomNav">
            底部tabbar
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.defaultLayout {
   position: relative;
   width: 100%;
   height: 100%;
   overflow: hidden;
   .pageHeader {
       z-index: 1001;
       height: 100px;
       background: #f66;
       position: relative;
       .headerNav {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
       }
   }
   .pageContent {
       z-index: 1000;
       height: calc(100% - 148px);
       overflow:hidden;
       overflow-y: scroll;
       background: yellowgreen;
   }
   .pageFooter {
       height: 48px;
       background: #f66;
       z-index: 1001;
       .bottomNav {
           width: 100%;
           height: 100%;
       }
   }
}
</style>
