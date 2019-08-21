import Vue from 'vue'
import App from './App'
import store from '@/store'
import { hasUserInfo, userLogin } from '@/mixins/userInfo.js'
import pageLoading from '@/components/loading/pageLoading.vue'

Vue.component('pageLoading', pageLoading)
Vue.prototype.$store = store
Vue.prototype.hasUserInfo = hasUserInfo
Vue.prototype.userLogin = userLogin

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
