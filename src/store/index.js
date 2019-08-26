import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import mess from './modules/mess'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    mess
  }
})
