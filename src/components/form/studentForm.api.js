import request from '@/tools/request'
import { sign } from '@/tools'

// 更新学员信息接口
export function updataStudentPage (data) {
  return request({
    url: sign('home/getStudentInfoByStudentId'),
    data
  })
}
