import request from '@/tools/request'
import { sign } from '@/tools'

export function gainCode (data) {
  return request({
    url: sign('login/getSmsCode'),
    data
  })
}

export function bindMessSubmit (data) {
  return request({
    url: sign('login/loginIn'),
    data
  })
}

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
