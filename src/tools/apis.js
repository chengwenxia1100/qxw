import request from './request'

export function test (data) {
  return request({
    method: 'get',
    url: 'song?id=37239038&format=1'
  })
}
