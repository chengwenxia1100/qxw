import request from '@/tools/request'
import { sign } from '@/tools'

export function getToken (data) {
  return request({
    url: 'login/getToken',
    data
  })
}

export function getHome (data) {
  return request({
    url: sign('home/index'),
    data
  })
}
