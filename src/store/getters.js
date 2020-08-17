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
  conversationCount: state => state.receive.conversationCount,
  queueCount: state => state.receive.queueCount
}
export default getters
