<template>
  <div id="app">
    <ClassComponent proid="proid223"/>
    <ExtendComponent proid="proid"/>
    <FunctionComponent a="1" b="你好" />
  </div>
</template>

<script lang="ts">
//  类组件 + 扩展式组件 + 函数式组件
import { Vue, Component } from 'vue-property-decorator'
import ClassComponent from './components/classComponent.vue'
import ExtendComponent from './components/extendComponent.vue'
import FunctionComponent from './components/functionComponent.vue'

//  使用装饰器去装饰该组件
@Component({
  components: {
    ClassComponent, ExtendComponent, FunctionComponent
  }
})
export default class App extends Vue {

}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
