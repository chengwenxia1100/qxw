export default {
  state: {
    userinfoStatus: false,
    emailValue: ''
  },
  mutations: {
    userinfo (state, val) {
      state.userinfoStatus = val
    },
    set_emailValue (state, val) {
      state.emailValue = val
    }
  }
}
