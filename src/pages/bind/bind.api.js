import request from '@/tools/request'

export function gainCode (data) {
  return request({
    url: 'login/getSmsCode',
    data
  })
}

export function bindMessSubmit (data) {
  return request({
    url: 'login/loginIn',
    data
  })
}