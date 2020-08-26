import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/signIn',
    method: 'post',
    data
  })
}
export function logout(token) {
  return request({
    url: '/user/checkToken',
    method: 'get',
    params: { token }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/checkToken',
    method: 'get',
    params: { token }
  })
}

export function getList() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/user/createUser',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
