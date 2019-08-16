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
