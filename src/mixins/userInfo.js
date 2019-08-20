import Store from '@/store/index.js'

// function userInfo () {
//   let exist = () => {
//     return Store.state.user.authorize.userInfo
//   }
//   let login = () => { //
//     wx.navigateTo({
//       url: '/pages/shop/authorize/main'
//     })
//   }
//   return {
//     exist,
//     login
//   }
// }

export function hasUserInfo () {
  return Store.state.user.authorize.userInfo
}

export function userLogin () {
  wx.navigateTo({
    url: '/pages/auth/main'
  })
}
