<template>
  <div class="chat_header">
    <div class="chat_header_items">
      <div v-if="currentConversationId" class="chat_header_right">
        <el-button type="text" @click="endConversation">结束会话</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['currentConversationId'])
  },
  methods: {
    endConversation() {
      this.$store.dispatch('endConversation', this.currentConversationId)
      this.$socket.emit('endConversation', this.currentConversationId)
    }
  }
}
</script>
<style lang="scss" scoped>
.chat_header{

  height:40px;
  border-bottom:1px solid #dcdcdc;
}
.chat_header_items{
  position: relative;
}
.chat_header_right{
  width:50px;
  position:absolute;
  right:10px;
}
</style>
