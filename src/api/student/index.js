import request from '@/tools/request'
import { sign } from '@/tools'

// 主页信息接口
export function getHome (data) {
  return request({
    url: sign('home/index'),
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

// 学员列表接口
export function getStudentList (data) {
  return request({
    url: sign('home/studentList'),
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

// 选择学校 
export function getSchoolList (data) {
  return request({
    url: sign('login/getSchoolList'),
    data
  })
}

// 选择学校 废弃
// export function getSchoolList (data) {
//   return request({
//     url: sign('teaching/school/getSchoolsByGrade'),
//     data
//   })
// }