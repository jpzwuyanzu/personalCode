<template>
    <div>
        产品管理
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getProlistData()
  },
  methods: {
    ...mapActions({
      getProlistData: 'pro/getProlistData'
    })
  }
}
</script>
