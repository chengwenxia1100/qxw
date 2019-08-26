
import { login } from '@/api/auth'
import { setToken, getToken } from '@/tools/auth'

export default {
  namespaced: true,
  state: {
    userInfo: undefined,
    authorize: {
      userInfo: false
    },
    verifiedAuthorize: false,
    token: getToken(),
    defaultToken: 'shougongquanzzz'
  },
  getters: {
    userInfo: state => state.userInfo,
    authorize_userInfo: state => state.authorize.userInfo,
    token: state => state.userInfo.token
  },
  mutations: {
    SET_USER_INFO (state, val) {
      state.userInfo = val
    },
    SET_AUTHORIZE_USERINFO (state, val) {
      state.authorize.userInfo = val
    },
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    },
    SET_VERIFIED_AUTHORIZE (state, payload) {
      state.verifiedAuthorize = payload
    }
  },
  actions: {
    UPDATE_AUTHORIZE_USERINFO ({ commit }) {
      wx.getSetting({
        success (res) {
          if (res.authSetting['scope.userInfo']) {
            commit('SET_AUTHORIZE_USERINFO', true)
          } else {
            commit('SET_AUTHORIZE_USERINFO', false)
          }
        }
      })
    },
    async LOGIN ({ commit }, { code, system, userInfo }) {
      try {
        const body = await login(code, system, userInfo)
        commit('SET_TOKEN', body.token)
        commit('SET_AUTHORIZE_USERINFO', true)
        commit('SET_USER_INFO', body)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
