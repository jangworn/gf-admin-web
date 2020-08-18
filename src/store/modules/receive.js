
import {
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
    conversationTabTitle: '0人待回复',
    queueList: [],
    queueTabTitle: '0人待接入',
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
        state.conversationTabTitle = state.conversationList.length + '人待回复'
      }
      state.queueList = []
      if (data.queue && data.queue.length > 0) {
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
        })
        state.queueTabTitle = state.queueList.length + '人待接入'
      }
    },
    // 发送消息
    sendReply(state, data) {
      const currentConversation = state.conversationList.find(item => item.uid === state.currentcurrentConversationId || item.uid === data.uid)

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
        const currentConversation = state.conversationList.find(item => item.uid === state.currentcurrentConversationId)
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
      console.log(state.currentConversation)
      if (id === state.currentConversation.uid) {
        state.kf_action = false
        state.currentConversation = []
        state.currentConversationId = false
      }
      state.conversationList.forEach(function(item, index) {
        if (item.uid === id) {
          state.conversationList.splice(index, 1)
          if (state.currentConversation.length > 0) {
            state.currentConversation.user.time = '已结束'
          }
        }
      })
      console.log(state.conversationList.length)
      state.conversationTabTitle = state.conversationList.length + '人待接入'
    },
    initSetting(state, data) {
      state.setting = data
    },
    setQueueCount(state, data) {
      state.queueTabTitle = data + '人待接入'
    },
    enterQueue(state, data) {
      console.log(data)
      const q = state.queueList.find(item => item.uid === data.uid)
      if (q) {
        q.user.msg = data.content.substr(0, 4) + '...'
        q.user.time = new Date()
        q.new_msg = 1
        q.messages.push({
          content: data.content,
          date: new Date(),
          self: false
        })
      } else {
        state.queueList.push({
          uid: data.uid,
          user: {
            name: data.uid,
            img: userimg,
            msg: data.content.substr(0, 4) + '...',
            time: new Date()
          },
          new_msg: 0,
          messages: [{
            content: data.content,
            date: new Date(),
            self: false
          }
          ]
        })
      }
      state.queueTabTitle = state.queueList.length + '人待接入'
    },
    deleteQueueOne(state, data) {
      state.queueList.forEach(function(item, index) {
        if (item.uid === data.uid) {
          state.queueList.splice(index, 1)
        }
      })
    },
    newConversation(state, data) {
      const currentConversationItem = {
        uid: data.uid,
        user: {
          name: data.uid,
          img: data.avatar && data.avatar !== '1' ? data.avatar : userimg,
          msg: data.lastest_msg ? data.lastest_msg.substr(0, 4) + '...' : '',
          time: data.time ? data.time : new Date()
        },
        messages: [],
        new_msg: data.num
      }
      state.conversationList.push(currentConversationItem)
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
    },
    setQueueCount({
      commit
    }, value) {
      commit('setQueueCount', value)
    },
    enterQueue({
      commit
    }, data) {
      commit('enterQueue', data)
    },
    endConversation({
      commit
    }, data) {
      console.log('结束111')
      commit('endConversation', data)
    },
    deleteQueueOne({
      commit
    }, data) {
      commit('deleteQueueOne', data)
    },
    newConversation({
      commit
    }, data) {
      commit('newConversation', data)
    }

  }
}
export default receive
