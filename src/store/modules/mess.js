export default {
  state: {
    userinfoStatus: false
  },
  mutations: {
    userinfo (state, val) {
      state.userinfoStatus = val
    }
  }
}
