import request from '@/tools/request'
import { sign } from '@/tools'

export function paperAnaly (data) {
  return request({
    url: sign('paper/PaperList'),
    data
  })
}
