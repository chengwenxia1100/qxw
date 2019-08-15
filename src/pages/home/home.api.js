import request from '@/tools/request'

export function getToken (data) {
  return request({
    url: 'login/getToken',
    data
  })
}

export function getHome (data) {
  return request({
    url: 'home/index',
    data
  })
}
