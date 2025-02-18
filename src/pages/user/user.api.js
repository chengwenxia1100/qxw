import request from '@/tools/request'
import { sign } from '@/tools'

export function getUser (data) {
  return request({
    url: sign('home/index'),
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
// 添加学员接口
export function addData (data) {
  return request({
    url: sign('home/studentAdd'),
    data
  })
}

// 选择班级
export function getSchoolList (data) {
  return request({
    url: sign('login/getSchoolList'),
    data
  })
}

export function setPassword (data) {
  return request({
    url: sign('home/checkStudentBindPassWord'),
    data
  })
}

export function checkPassword (data) {
  return request({
    url: sign('home/setStudentBindPassWord'),
    data
  })
}