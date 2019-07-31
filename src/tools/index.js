import md5 from 'js-md5'
import { getToken } from './auth'

// const TOKEN = 'shougongquanzzz'
const TOKEN = 'bcovu0okcdgirltgvj4qcooo6mrktbol'

const SALT = 'sgzzzz'

export function sign (url, option) {
  let token = getToken() || TOKEN

  if (option) {
    if (option.token) {
      token = option.token
    }
  }

  const timestr = (new Date().getTime()).toString() // 获取当前时间的毫秒数
  const timeStamp = timestr.substr(0, timestr.length - 3) // 时间戳 长整形 取到秒
  const signStr = token + SALT + timeStamp
  return `${url}?token=${token}&timestamp=${timeStamp}&sign=${md5(md5(signStr))}`
}

export function wxLogin () {
  return new Promise((resolve) => {
    wx.login({
      success (code) {
        resolve(code)
      }
    })
  })
}

export function wxGetSystemInfo () {
  return new Promise((resolve) => {
    wx.getSystemInfo({
      success (data) {
        resolve(data)
      }
    })
  })
}
