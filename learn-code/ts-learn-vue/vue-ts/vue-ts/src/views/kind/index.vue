<template>
  <div class="kindContainer">
    <h1>分类index</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class KindPage extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.kindContainer {
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
