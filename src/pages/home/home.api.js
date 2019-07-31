import request from '@/tools/request'
import { sign } from '@/tools'

export function getOrderList (data) {
  return request({
    url: sign('order/orderList'),
    data
  })
}
