import request from '@/tools/request'
import { sign } from '@/tools'

export function mistakeBook (data) {
  return request({
    url: sign('book/mistakeBook'),
    data
  })
}
