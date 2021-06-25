<template>
  <div class="menuConatiner">
    <a-menu
      mode="inline"
    >
      <template v-for="(item, index) in menudata">
        <a-menu-item v-if="!item.children" :key="index" >
            <a-icon type="mail" />
            {{item.title}}
        </a-menu-item>
        <a-sub-menu v-else :key="index">
            <span slot="title"><a-icon type="appstore" /><span>{{ item.title }}</span></span>
            <a-menu-item v-for="(item1, index1) in item.children"  :key="index + '' + index1">
            {{ item1.title }}
            </a-menu-item>
        </a-sub-menu>
      </template>
      
    </a-menu>
  </div>
</template>
<script>
// import mymenu from '../layouts/mymenu'
export default {
  name: 'MyMenu',
  props: ['menudata'],
  mounted () {
    console.log('child', this.menudata)
  }
}
</script>
<style>
    .menuConatiner {
        height: 100%;
    }
    .ant-menu {
        height: 100%;
    }
</style>