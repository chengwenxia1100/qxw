import request from '@/tools/request'
import { sign } from '@/tools'

export function mistakeBook (data) {
  return request({
    url: sign('book/mistakeBook'),
    data
  })
}

// 错题本导出记录
export function exportMistakeBook (data) {
  return request({
    url: sign('book/exportMistakeBook'),
    data
  })
}
