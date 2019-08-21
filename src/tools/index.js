// import md5 from 'js-md5'
import { getToken } from './auth'

const TOKEN = '123'
// const TOKEN = '38c533200b8a205f7169de372195dfb0'

// const SALT = 'sgzzzz'

export function sign (url, option) {
  let token = getToken() || TOKEN
  if (option) {
    if (option.token) {
      token = option.token
    }
  }
  return `${url}?token=${token}`
}

// 登录接口
export function wxLogin () {
  return new Promise((resolve, reject) => {
    wx.login({
      success (code) {
        resolve(code)
      },
      fail () {
        console.log('授权失败')
        // reject()
      }
    })
  })
}

/**
 * 同步获取 设备-----系统信息
 *
 * @export
 * @returns {Promise<wx.SystemInfo>}
 */
export function wxGetSystemInfo () {
  return new Promise((resolve) => {
    wx.getSystemInfo({
      success (data) {
        resolve(data)
      }
    })
  })
}

/**
 * 同步获取 网络类型
 * @export
 * @returns {Promise<wx.NetworkTypeData>}
 */
export function getNetworkType () {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success (res) {
        resolve(res)
      }
    })
  })
}
