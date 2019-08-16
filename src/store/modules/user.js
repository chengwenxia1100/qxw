export default {
  state: {
    token: '',
    defaultToken: '123'
  },
  mutations: {
    set_token (state, val) {
      state.token = val
    },
    set_user_info (state, val) {
      state.userinfo = val
    }
  }
}
