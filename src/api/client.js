import request from '@/utils/request'

export function getList() {
  return request({
    url: '/client/list',
    method: 'get'
  })
}
