import axios from 'axios'

axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url,
      method: 'post',
      data: config.data,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

const AxiosInstance = axios.create({
  baseURL: process.env.WX_API,
  timeout: 5000
})

AxiosInstance.interceptors.request.use((config) => {
  return config
})

AxiosInstance.interceptors.response.use((res) => {
  let data = res.data
  if (data.status === 1) {
    return data.data
  }
  wx.showToast({ title: data.msg, icon: 'none' })
  // wx.showModal({
  //   title: '友情提示',
  //   content: data.msg,
  //   showCancel: false
  // })
  return Promise.reject(data)
})

export default AxiosInstance
