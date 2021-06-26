<template>
  <div id="mainLayout">
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider id="asideMenu" style="height:800px;" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <my-menu :menudata="menudata"/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <nuxt/>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>
<script>
import MyMenu from './mymenu'
import menudata from './menudata'
export default {
  components: {
    MyMenu
  },
  data() {
    return {
      collapsed: false,
      menudata: menudata
    };
  },
  mounted () {
    this.menudata = menudata
    // console.log(this.menudata)
  }
};
</script>
<style>
#__nuxt, #__layout, #components-layout-demo-custom-trigger, .ant-layout-sider, .ant-layout-sider-children, #asideMenu { height: 100%;}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
