import request from '@/utils/request'

export function getQueueList() {
  return request({
    url: '/receive/getQueueList',
    method: 'get'
  })
}

export function getConversationList() {
  return request({
    url: '/receive/getConversationList',
    method: 'get'
  })
}

export function getConversationMessage(uid) {
  return request({
    url: '/receive/getConversationMessage',
    method: 'get',
    params: { uid }
  })
}

