const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  currentConversation: state => state.receive.currentConversation,
  conversationList: state => state.receive.conversationList,
  currentConversationId: state => state.receive.currentConversationId,
  queueList: state => state.receive.queueList,
  queue_count: state => state.receive.queue_count
}
export default getters
