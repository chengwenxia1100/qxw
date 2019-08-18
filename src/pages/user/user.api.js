import request from '@/tools/request'
import { sign } from '@/tools'

export function getUser (data) {
  return request({
    url: sign('home/index'),
    data
  })
}
// 学员列表接口
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
// 更新学员信息接口
export function updataStudentPage (data) {
  return request({
    url: sign('home/getStudentInfoByStudentId'),
    data
  })
}
// 更新学员完成接口
export function updataStudent (data) {
  return request({
    url: sign('home/studentUpdate'),
    data
  })
}
// 学员解绑接口
export function removeBind (data) {
  return request({
    url: sign('home/studentUnbind'),
    data
  })
}