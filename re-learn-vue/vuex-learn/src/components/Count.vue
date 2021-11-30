<template>
  <div class="count">
      <span>count: {{ count }}</span><br/>
      <span>otherCount: {{otherCount}}</span><br/>
      <span>countPlusLocalState:{{countPlusLocalState}}</span>
      <button @click="increment">add</button>
    <input type="text" v-model="message">
    {{ message }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
      return {
          localCount: 3
      }
  },
//   computed: {
//       count() {
//           return this.$store.state.count
//       }
//   },

// 当映射的计算属性的名称和state的属性一致，可以传递一个字符串数组
// computed: mapState(['count']),

// 使用mapState辅助函数
computed: {
    message: {
        get () {
            return this.$store.state.message
        },
        set (value) {
            this.$store.commit('upDateMessage', { message: value })
        }
    },
    ...mapState({

    count: state => state.count, 

    // 传递字符串等同于 state => state.cout
    otherCount: 'count',

    countPlusLocalState (state) {
        //要使用this获取组件中的数据必须使用常规函数
        return state.count + this.localCount
    },
    
})
},

  methods: {
      increment () {
          this.$store.commit('increment')
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
