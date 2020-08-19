<template>
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
            <el-button type="text" @click="receive(scope.row.uid)">接入</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="已过期" />
  </el-tabs>
</template>
<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['queueList'])
  },
  methods: {
    receive(uid) {
      this.$socket.emit('receive', { uid: uid, kfId: Cookies.get('kfId') })
    },
    handleSelectionChange() {

    }

  },
  sockets: {
    queueCount: function(msg) {
      console.log('设置排队人数', msg)
      this.$store.dispatch('setQueueCount', msg)
    },
    enterQueue: function(msg) {
      console.log('进入队列', msg)
      this.$store.dispatch('enterQueue', msg)
    },
    deleteQueueOne: function(msg) {
      console.log('排队删除接入的客户')
      this.$store.dispatch('deleteQueueOne', msg)
    },
    newConversation: function(msg) {
      console.log('新会话')
      this.$store.dispatch('newConversation', msg)
    }
  }

}
</script>
