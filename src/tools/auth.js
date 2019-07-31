export function getToken () {
  return wx.getStorageSync('token')
}

export function setToken (token) {
  wx.setStorageSync('token', token)
}
