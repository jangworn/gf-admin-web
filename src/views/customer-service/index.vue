<template>
  <div class="app-container">
    <el-tabs id="tabs" type="border-card">
      <el-tab-pane :label="conversationTabTitle">
        <el-row class="conversation-box">
          <el-col :span="6">
            <left />
          </el-col>
          <el-col :span="18">
            <div class="chat">
              <headerBox />
              <message />
              <inputBox />
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="queueTabTitle" class="tag-padding">
        <queueList />
      </el-tab-pane>
      <el-tab-pane label="设置" class="tag-padding">设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import left from './left/list'
import message from './right/message'
import headerBox from './right/header'
import inputBox from './right/inputBox'
import queueList from './queueList'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  components: {
    left, message, headerBox, inputBox, queueList
  },

  data() {
    return {
      conversationTab: '',
      queueTab: ''
    }
  },
  computed: {
    ...mapGetters(['queueTabTitle', 'conversationTabTitle'])
  },
  created() {
    this.$store.dispatch('initData')
  },
  mounted() {
    this.$socket.emit('kfSignIn', { id: Cookies.get('kfId') })
    console.log('kfid', Cookies.get('kfId'))
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
