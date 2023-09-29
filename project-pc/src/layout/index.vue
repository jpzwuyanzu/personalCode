<script setup lang="ts">
import HeaderCom from "@/components/Header.vue";
import FooterCom from "@/components/Footer.vue";
</script>

<template>
  <div>
    <HeaderCom />
    <RouterView />
    <FooterCom />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
