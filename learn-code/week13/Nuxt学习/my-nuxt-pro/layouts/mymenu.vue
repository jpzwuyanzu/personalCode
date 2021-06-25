<template>
  <div>
    <a-menu
      mode="inline"
    >
      <a-menu-item key="1">
        <a-icon type="mail" />
        Navigation One
      </a-menu-item>
      <a-sub-menu >
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
        <a-menu-item key="5">
          Option 5
        </a-menu-item>
      </a-sub-menu>
      
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