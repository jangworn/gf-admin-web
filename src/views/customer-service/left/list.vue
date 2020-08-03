<template>
  <div class="sadfsdf">
    <el-scrollbar class="list">
      <div
        v-for="(item,index) in conversationList"
        :key="index"
        class="list-item"
        :class="{ active: item.uid === currentConversationId , new_msg:item.new_msg && item.uid !=currentConversationId }"
        @click="changeClient(item.uid)"
      >
        <el-row :gutter="0">
          <el-col
            :span="5"
            class="msg-right"
          >
            <div class="left">
              <el-badge
                v-if="item.new_msg == 1"
                :value="item.new_msg"
                :hidden="item.new_msg==0"
                :max="99"
                is-dot
              >
                <img
                  :alt="item.user.name"
                  :src="item.user.img"
                  class="avatar"
                  width="40"
                  height="40"
                >
              </el-badge>
              <el-badge
                v-else
                :value="item.new_msg"
                :hidden="item.new_msg==0"
                :max="99"
                class="item"
              >
                <img
                  :alt="item.user.name"
                  :src="item.user.img"
                  class="avatar"
                  width="40"
                  height="40"
                >
              </el-badge>
            </div>

          </el-col>
          <el-col :span="13">
            <div class="right">
              <div class="right-top">{{ item.user.name }}</div>
              <div class="right-bottom">
                <div class="b-left">{{ item.user.msg }}</div>

              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="b-right">{{ item.user.time|fmtTtime }}<br><span v-if="item.user.sensitive" style="color:red">*****</span></div>
          </el-col>
        </el-row>

      </div>
    </el-scrollbar>

  </div>
</template>
<script>
import { getConversationList } from '@/api/receive'
import { mapGetters } from 'vuex'
export default {

  data() {
    return {
      currentId: '',
      sessions: [
        {
          id: 123,
          user: { name: '张三' }
        },
        {
          id: 123,
          user: { name: '李四' }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['conversationList', 'currentConversationId'])
  },
  filters: {
    fmtTtime(date) {
      if (typeof date === 'string') {
        if (
          date == '已结束' ||
          (date.indexOf(':') > -1 &&
            date.indexOf('T') == -1 &&
            date.indexOf('Z') == -1)
        ) {
          return date
        }
        date = new Date(date)
      } else if (typeof date === 'number') {
        date = new Date(date)
      }

      const minutes =
        date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      return date.getHours() + ':' + minutes
    }
  },

  created() {

  },
  mounted() {
  // this.getConversationList()
    console.log('fffff')
    console.log(this.conversationList)
  },
  methods: {
    /* async getConversationList() {
      const res = await getConversationList()
      this.conversationList = res.data
    }, */
    changeClient(uid) {
      // console.log(uid)
      this.$store.dispatch('changeClient', { uid: uid, page: 1 })
    }
  }

}
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
<style lang="less" scoped >

.list {

   height: calc(100vh - 170px);

  .list-item {
    padding: 12px 15px;
    cursor: pointer;
    transition: .2s background-color;
    position: relative;

    &.active {
      background-color: #f5f5f5;
    }
    i {
      width: 8px;
      height: 8px;
      background: red;
      border-radius: 10px;
      display: none;
      position: absolute;
      top: 10px;
      left: 40px;
    }
     .clear {
        clear: both;
      }
      .left,
      .right,
      .b-left,
      .t-left {
        float: left;
        font-size: 14px;
      }
      .left {
        height: 40px;
        margin-right: 10px;
      }
      .right {
        width: 100%;
        overflow: hidden;
      }
      .b-right,
      .t-right {
        float: right;
        font-size: 14px;
      }
      .t-right {
        color: #409eff;
      }
      .b-left {
        margin-top: 10px;
      }
      .b-right {
        color: #666;
        margin-top: 10px;
        text-align: right;
      }
      .msg-right {
        position: relative;
      }

      .right-top {
        height: 16px;
        overflow: hidden;
      }
  }
  .new_msg i {
    display: block;
  }
  .avatar,
  .name {
    vertical-align: middle;
  }
  .avatar {
    border-radius: 2px;
  }
  .name {
    display: inline-block;
    margin: 0 0 0 15px;
  }
}
.list .list-item:hover{
   transition: .2s background-color;
   background: #f5f5f5;

}
</style>
