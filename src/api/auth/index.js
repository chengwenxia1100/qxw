import request from '@/tools/request'
import { sign } from '@/tools'

/**
 * 微信登录
 *
 * @export
 * @param {string} code 微信login code
 * @param {string} loginOs 手机型号
 * @param {import('@/@types/common').UserInfo} userInfo
 * @param {string} type 登录类型 0->微信app登录 Y 1->微信服务号 2->微信小程序登录 Y
 * @returns {Promise<import('@types/api').ResponseLoginType>}
 */
export function login (code, loginOs, userInfo, type = 2) {
  return request({
    method: 'post',
    url: sign('login/getToken'),
    data: { code, loginOs, userInfo, type, clientId: 'cswxapp' }
  })
}
