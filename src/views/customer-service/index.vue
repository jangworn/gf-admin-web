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
        <el-tabs>
          <el-tab-pane label="待接入">
            <el-table
              ref="multipleTable"
              :data="queueList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="客户信息" width="120">
                <template slot-scope="scope">{{ scope.row.uid }}</template>
              </el-table-column>
              <el-table-column prop="latest_time" label="消息时间" width="120" />
              <el-table-column prop="kf_id" label="上次接待客服" show-overflow-tooltip />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="joinSession(scope.row.uid)">接入</el-button>

                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已过期" />
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="设置" class="tag-padding">设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import left from './left/list'
import header from './right/header'
import message from './right/message'
import inputBox from './right/inputBox'
import { getQueueList } from '../../api/receive'
import { mapGetters } from 'vuex'
export default {
  components: {
    left, header, message, inputBox
  },

  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['queueList'])
  },
  created() {
    this.$store.dispatch('initData')
  },
  mounted() {
    this.$socket.emit('kfSignIn', { id: '123' })
  },
  methods: {

    joinSession() {

    },
    /*  async getQueueList() {
      const res = await getQueueList()
      this.queuesList = res.data
    }, */
    handleSelectionChange() {

    }

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
