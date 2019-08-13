import request from '@/tools/request'

export function getToken (data) {
  return request({
    url: 'login/getToken',
    data
  })
}
