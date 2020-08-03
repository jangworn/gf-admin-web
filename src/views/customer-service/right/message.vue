<template>
  <div class="scroll-wrapper chat_body scrollbar-macosx" style="position: relative;height:600px;">
    <el-scrollbar ref="elscrollbar" v-scroll-list="{page:this.page}" class="msg_scroll">
      <div class="message">
        <div
          v-if="currentConversation && currentConversation.messages && conversationList.length>0"
        >
          <div
            v-scroll-bottom="{scroll:this.scroll_to_bottom,messages:currentConversation.messages}"
            class="scroll_content"
          >
            <p class="more">
              <span v-loading="loading" element-loading-spinner="el-icon-loading" />
              <span :style="{display:more_text_display}">查看更多消息</span>
            </p>
            <ul v-if="currentConversation">
              <li
                v-for="(item,index) in currentConversation.messages"
                v-if="currentConversation.messages"
                :key="index"
              >
                <p class="time">
                  <span>{{ item.date | time }}</span>
                </p>
                <div :class="{ self: item.self }" class="main">
                  <div v-if="item.self" class="kf_t">{{ item.from_name }}</div>
                  <img
                    v-if="item.id==='999'"
                    :src="item.self ? kfimg : currentConversation.user.img"
                    class="avatar"
                    width="30"
                    height="30"
                  >
                  <img
                    v-else
                    :src="item.self ? kfimg : currentConversation.user.img"
                    class="avatar"
                    width="30"
                    height="30"
                  >
                  <div v-if="item.content.indexOf('wx_img') > -1 " class="text">
                    <img
                      :src="item.content"
                      height="150"
                      width="auto"
                      @click="show_img(item.content)"
                    >
                  </div>
                  <div v-else class="text">
                    <span v-html="item.content" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import kfimg from '@/assets/kf.png'
export default {
  directives: {
    // 发送消息后滚动到底部
    'scroll-bottom': function(el, binding) {
      // var len = binding.value.length - 1;
      // //console.log(binding);
      if (binding.value.scroll === true) {
        setTimeout(() => {
          const oContent = document.querySelector(
            '.msg_scroll .el-scrollbar__wrap'
          )
          oContent.scrollTop = el.scrollHeight
        }, 0)
      }
    },
    'scroll-list': {
      inserted: function(el, binding, vnode, oldVnode) {
        el.children[0].addEventListener('scroll', async() => {
          // //console.log(el.children[0].clientHeight, el.children[0].scrollTop);
          if (el.children[0].scrollTop <= 0) {
            setTimeout(() => {
              binding.value.scroll = false
              binding.value.page++
              // binding.value.load(binding.value.page)
            }, 200)
          }
        })
      }
    }
  },

  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === 'string') {
        if (date.indexOf('T') == -1 && date.indexOf('Z') == -1) {
          return date
        }
        date = new Date(date)
      }
      const minutes =
        date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      return date.getHours() + ':' + minutes
    },
    filter_num(str) {
      var abc = /^[a-zA-Z0-9-=]*$/
      if (abc.test(str)) {
        try {
          var a = window.atob(str)
        } catch (err) {}
      }
      var reg = /^[0-9]+_[0-9]*$/
      if (a && reg.test(a)) {
        return a.replace(/^[0-9]+_/, '')
      } else {
        return str
      }
    }
  },
  sockets: {
    putQuestion: function(msg) {
      this.$store.dispatch('setContent', msg)
    }
  },
  data() {
    return {
      kfimg,
      page: 1,
      loading: false,
      more_text_display: false,
      scroll_to_bottom: true
    }
  },
  computed: {
    ...mapGetters(['currentConversation', 'conversationList'])
  },
  created() {},
  methods: {}
}
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style lang="less" scoped>
.message {
  //overflow-y: scroll;
  height: auto;
  //position: relative;
}
.el-main {
  padding: 0 10px;
}
.el-scrollbar {
  height: ~"calc(100vh - 360px)";
}

.img_dialog {
  padding: 0;
  text-align: center;
  .el-dialog {
    .el-dialog__body {
      padding: 0 !important;
      img {
        max-width: 100%;
      }
    }
  }
}
.kf_action {
  height: 40px;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid #e4e1e1;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 40px;
  font-size: 14px;
  z-index: 99;
  background: #fff;
  .left {
    float: left;
    .platform {
      color: #666;
    }
  }
  .right {
    float: right;
  }
}
.scroll_content {
  padding: 10px 15px;
  //overflow-y: scroll;
  ul {
    padding: 20px 0 0 0;
    li {
      margin-bottom: 15px;
      list-style-type: none;
    }
  }
  .more {
    text-align: center;
    color: #409eff;
    font-size: 12px;
  }
  .time {
    margin: 7px 0;
    text-align: center;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }
  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: ~"calc(100% - 40px)";
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }
  .kf_t {
    padding: 5px 40px 5px 0px;
    font-size: 14px;
    color: #666;
  }
  .self {
    text-align: right;

    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #b2e281;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
.cut {
  width: auto;
  height: 500px;
  margin: 30px auto;
}
</style>
