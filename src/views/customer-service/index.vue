<template>
  <div class="app-container">
    <el-tabs id="tabs" type="border-card">
      <el-tab-pane label="0人待回复">
        <el-row class="conversation-box">
          <el-col :span="6">
            <left />
          </el-col>
          <el-col :span="18">
            <div class="chat">
              <header />
              <message />
              <inputBox />
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="0人待接入" class="tag-padding">
        <queueList />
      </el-tab-pane>
      <el-tab-pane label="设置" class="tag-padding">设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import left from './left/list'
import message from './right/message'
import inputBox from './right/inputBox'
import queueList from './queueList'
import { mapGetters } from 'vuex'
export default {
  components: {
    left, message, inputBox, queueList
  },

  data() {
    return {

    }
  },

  created() {
    this.$store.dispatch('initData')
  },
  mounted() {
    this.$socket.emit('kfSignIn', { id: '123' })
  },

  sockets: {

  }
}
</script>
<style lang="less">
.chat {
  border-left: 1px solid #dcdcdc;
  background-color: #f5f5f5;
  height: calc(100vh - 170px);
  padding:10px;
}

/* #tabs {
    padding: 20px!important;
    border:1px solid red;
} */
#tabs .el-tabs__content{
   background-color: #f5f5f5!important;
   padding:0px!important;
}
.conversation-box{
  background: #fff;
}
.tag-padding{
  padding:20px 20px;
   background: #fff;
}
</style>
