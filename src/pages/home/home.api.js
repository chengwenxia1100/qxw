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

export function getStudentList (data) {
  return request({
    url: sign('home/studentList'),
    data
  })
}
// 学员切换接口
export function getchange (data) {
  return request({
    url: sign('home/checkStudent'),
    data
  })
}
