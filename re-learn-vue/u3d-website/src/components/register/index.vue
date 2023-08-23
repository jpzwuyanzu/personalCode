<template>
  <div class="register_contaier">
    <van-field v-model="regTel" type="tel"  left-icon="smile-o"/>
    <van-field v-model="regPass" type="tel"  left-icon="smile-o"/>
    <van-field v-model="confirmPass" type="tel"  left-icon="smile-o"/>
    <van-field v-model="tel" type="tel"  left-icon="smile-o"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
const regTel = ref("");
const regPass = ref("");
const confirmPass = ref("");
const account = ref("");
const onSubmit = (values) => {
  console.log("submit", values);
};
</script>

<style scoped>
.register_contaier {
  height: calc(100% - 492px);
}
</style>
