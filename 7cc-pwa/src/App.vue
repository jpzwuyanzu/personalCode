<template>
  <van-config-provider
    :theme="theme"
    :theme-vars="themeVars"
    style="height: 100%"
    :theme-vars-dark="themeVarsDark"
    :theme-vars-light="themeVarsLight"
  >
    <div class="layout_container">
      <div class="layout_content">
        <RouterView />
      </div>
      <FooterTab />
    </div>
  </van-config-provider>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import FooterTab from "@/layout/FooterTab.vue";
import useStore from "@/store/index";
const { custheme } = useStore();
const theme: any = computed(() => custheme.theme);
const themeVars = reactive({ buttonPrimaryBackground: "red" });
const themeVarsDark = reactive({ buttonPrimaryBackground: "blue" });
const themeVarsLight = reactive({ buttonPrimaryBackground: "green" });
</script>

<style lang="scss" scoped>
.layout_container {
  height: 100%;
  .layout_content {
    height: calc(100% - 50px);
  }
}
</style>
