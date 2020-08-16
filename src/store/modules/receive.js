
import {
  endConversation,
  getConversationList,
  getConversationMessage
} from '@/api/receive'
import userimg from '@/assets/user.png'
const receive = {
  state: {
    user: {
      name: '',
      img: ''
    },
    // 会话列表
    conversationList: [],
    queueList: [],
    currentConversation: [],
    currentConversationId: '',
    content: ''

  },
  mutations: {
    initData(state, data) {
      state.conversationList = []
      state.currentConversation = []
      if (data.conversation && data.conversation.length > 0) {
        data.conversation.forEach(function(item) {
          const currentConversationItem = {
            uid: item.uid,
            user: {
              name: item.uid,
              img: item.avatar && item.avatar !== '1' ? item.avatar : userimg,
              msg: item.lastest_msg ? item.lastest_msg.substr(0, 4) + '...' : '',
              time: item.time ? item.time : new Date()
            },
            messages: [],
            new_msg: item.num
          }
          state.conversationList.push(currentConversationItem)
        })
      }
      state.queueList = []
      if (data.queue.length > 0) {
        data.queue.forEach(function(item) {
          const currentConversation_w = {

            uid: item.uid,
            user: {
              name: item.nickname && item.nickname !== '1' ? item.nickname : item.uid,
              img: item.avatar && item.avatar !== '1' ? item.avatar : userimg,
              msg: '',
              time: item.time ? item.time : new Date()
            },
            messages: []
          }
          state.queueList.push(currentConversation_w)
          console.log(state.queueList)
        })
      }
    },
    // 发送消息
    sendReply(state, data) {
      const currentConversation = state.conversationList.find(item => item.id === state.currentcurrentConversationId || item.id === data.uid)

      if (currentConversation && currentConversation.messages) {
        currentConversation.messages.push({
          content: data.content,
          date: new Date(),
          self: true
        })
      }
    },
    // 选择会话
    getConversationMessage(state, data) {
      state.currentConversationId = data[0]

      state.currentConversation = state.conversationList.find(currentConversation => currentConversation.uid === state.currentConversationId)
      state.currentConversation.new_msg = 0
      state.currentConversation.messages = []
      data[1].forEach(function(s) {
        state.currentConversation.messages.push({
          content: window.decodeURIComponent(window.atob(s.content)),
          date: s.time,
          self: s.sender !== data[0],
          id: s.sender,
          from_name: s.sender
        })
      })
      console.log(state.currentConversation)
      if (state.currentConversation.user.time !== '已结束') {
        state.kf_action = true
      }
      // //console.log(state.currentConversation)
    },

    setContent(state, data) {
      if (data.uid) {
        const currentConversation = state.conversationList.find(item => item.uid === data.uid)
        if (currentConversation) {
          currentConversation.user.msg = data.content.substr(0, 4) + '...'
          currentConversation.user.time = new Date()
          if (!currentConversation.new_msg) {
            currentConversation.new_msg = 1
          } else {
            currentConversation.new_msg += 1
          }

          currentConversation.messages.push({
            content: data.content,
            date: new Date(),
            self: false
          })
        } else {
          state.conversationList.push({
            uid: data.uid,
            user: {
              name: data.nickname && data.nickname !== '1' ? data.nickname : data.uid,
              img: data.img && data.img !== '1' ? data.img : userimg,
              msg: data.content.substr(0, 4) + '...',
              time: new Date()
            },
            new_msg: 1,
            messages: [{
              content: data.content,
              date: new Date(),
              self: false
            }]
          })
        }
      } else {
        const currentConversation = state.conversationList.find(item => item.id === state.currentcurrentConversationId)
        currentConversation.messages.push({
          content: data.content,
          date: new Date(),
          self: true
        })
      }
      state.conversationList.sort(function(a, b) {
        const value1 = Number(a.user.time)
        const value2 = Number(b.user.time)
        if (value1 > value2) {
          return -1
        } else if (value1 < value2) {
          return 1
        } else {
          return 0
        }
      })
    },

    endConversation(state, id) {
      if (id == state.currentConversation.id) {
        state.kf_action = false
        state.currentConversation = []
      }
      state.conversationList.forEach(function(item, index) {
        if (item.id == id) {
          state.conversationList.splice(index, 1)
          if (state.currentConversation.length > 0) {
            state.currentConversation.user.time = '已结束'
          }
        }
      })
    },
    initSetting(state, data) {
      state.setting = data
    }

  },
  actions: {
    initData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getConversationList().then(response => {
          commit('initData', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    sendMessage({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        commit('sendReply', data)
      })
    },

    changeClient({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        getConversationMessage(data.uid, data.page).then(response => {
          if (data.page === 1) {
            commit('getConversationMessage', [data.uid, response.data])
          } else {
            commit('loadMoreConversationMessage', [data.id, response.data])
          }

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    setContent({
      commit
    }, value) {
      commit('setContent', value)
    }

  }
}
export default receive
