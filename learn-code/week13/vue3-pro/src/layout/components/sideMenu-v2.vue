<template>
    <a-menu theme="dark" @click="changeRoute" mode="inline" v-model:selectedKeys="selectedKeys">
        <template v-for="route of routes"  >
            <a-sub-menu :key="route.path" v-if="route.children && route.children.length > 1">
                <template #title>
                <span>
                    <span>{{ route.title }}</span>
                </span>
                </template>
                <sider-menu :routes="route.children" />
            </a-sub-menu>
            <a-menu-item v-else :key="route.path">
                <span>{{ route.title }}</span>
            </a-menu-item>
        </template>
    </a-menu>
</template>
<script>
export default {
  name: 'sider-menu',
  props: {
    routes: Array
  },
  data () {
    return {
      selectedKeys: []
    }
  },
  methods: {
    changeRoute ({ item, key, keypath }) {
      console.log(key)
      console.log(this)
    }
  }
}
</script>
