import Vue from 'vue'
import App from './App'
import store from '@/store'
// import mixin from '@/mixins'
import { hasUserInfo, userLogin } from '@/mixins/userInfo.js'

// Vue.mixin(mixin)
Vue.prototype.$store = store
Vue.prototype.hasUserInfo = hasUserInfo
Vue.prototype.userLogin = userLogin

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
