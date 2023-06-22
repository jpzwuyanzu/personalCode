<template>
  <van-popup
    v-model:show="isShowPopup"
    position="left"
    closeable
    close-icon-position="top-left"
    close-icon="close"
    :style="{ padding: '64px', height: '100%' }"
    @click-overlay="hiddenPopup"
    @click-close-icon="hiddenPopup"
  >
    主题色彩：<van-switch v-model="themeCheck" @change="switchThemeType" />
  </van-popup>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import useStore from "@/store/index";
const { custheme } = useStore();
const props = defineProps({
  leftPopupShow: {
    type: Boolean,
    default: false,
  },
});
const $emit = defineEmits(["switchLeftPopup"]);

const isShowPopup = ref(false);
const themeCheck = ref(false);

const hiddenPopup = () => {
  $emit("switchLeftPopup", false);
};
const switchThemeType = (value: any) => {
  custheme.switchTheme(Boolean(value) ? "dark" : "light");
};

watchEffect(() => {
  isShowPopup.value = props.leftPopupShow;
});
</script>
<style lang="scss" scoped>
.left_popup_container {
  height: 100%;
}
</style>
