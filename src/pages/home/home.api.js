import request from '@/tools/request'
import { sign } from '@/tools'

export function getHome (data) {
  return request({
    url: sign('home/index'),
    data
  })
}
