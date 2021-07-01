<template>
    <div>
      <button @click="sendData">发送数据</button>
    </div>
</template>
<script>
export default {
  setup (props, context) {
    console.log(props)
    console.log(context)
    return {
      sendData: () => {
        context.emit('my-event', '1000')
      }
    }
  }
}
</script>
