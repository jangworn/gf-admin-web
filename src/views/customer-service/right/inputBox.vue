<template>
  <div class="input-box">
    <div class="chat_edit">
      <div class="chat_edit_input">
        <div>
          <textarea v-model="answer" :rows="6" placeholder="请输入内容" @keyup.enter="sendReply" />
        </div>
      </div>
      <div class="chat_edit_footer">按Enter发送，Ctrl+Enter换行</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      answer: ''
    }
  },
  computed: {
    ...mapGetters(['currentConversationId'])
  },
  methods: {
    sendReply() {
      this.$socket.emit('reply', {
        openid: this.currentConversationId,
        content: window.btoa(window.encodeURIComponent(this.answer))
      })
      this.answer = ''
    }
  }
}
</script>
<style scoped>
.chat_edit_items {
  height: 40px;
  padding: 0 20px;
}
.chat_edit_input {
  height: 120px;
  padding: 5px 20px;
  overflow: hidden;
}
.emoji_popup {
  position: absolute;
  left: 10px;
  top: -270px;
  z-index: 10;
  background-color: #fff;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border: 1px solid #dcdcdc;
}
.chat_edit_footer {
  height: 30px;
  padding: 0 20px;
  text-align: right;
  color: #bcbcbc;
}
.scroll-wrapper > .scroll-content {
  border: none !important;
  box-sizing: content-box !important;
  height: auto;
  left: 0;
  margin: 0;
  max-height: none;
  max-width: none !important;
  overflow: scroll !important;
  padding: 0;
  position: relative !important;
  top: 0;
  width: auto !important;
}
textarea {
  padding: 10px;
  height: 60%;
  width: 100%;
  border: none;
  outline: none;
  font-family: "Micrsofot Yahei";
  resize: none;
  background: #f5f5f5;
}
.input-box {
  margin-top: 10px;
  border-top: 1px solid #dcdfe6;
}
</style>
