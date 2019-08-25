<template>
  <div>
    <div class="auth-action">
      <img :src="bgImg" class="auth-action__bg__img">
      <button
        type="primary"
        lang="zh_CN"
        open-type="getUserInfo"
        @getuserinfo="getuserinfo"
        class="auth-action__button">
        <image :src="wechat" class="auth-action__button__img" />
        <span v-if="canIUse">微信授权登录</span>
        <span v-else>请升级微信版本</span>
      </button>
    </div>
  </div>
</template>

<script>
import { wxGetSystemInfo, wxLogin } from '@/tools'
import store from '@/store'

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  methods: {
    /**
     * @param {import('@types/common').UserInfoResponse} e
     */
    async getuserinfo (e) {
      const userInfo = e.mp.detail.userInfo
      if (userInfo) {
        wx.showLoading({
          title: '用户授权中',
          mask: true
        })
        const { code } = await wxLogin()
        const { system } = await wxGetSystemInfo()
        try {
          store.commit('user/SET_AUTHORIZE_USERINFO', true)
          await this.$store.dispatch('user/LOGIN', { code, system, userInfo })
          wx.showToast({
            icon: 'success',
            duration: 1500,
            title: '授权成功',
            mask: true,
            success () {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
                store.commit('user/SET_AUTHORIZE_USERINFO', true)
              }, 500)
            }
          })
        } catch (error) {
          store.commit('user/SET_AUTHORIZE_USERINFO', false)
          wx.showToast({ title: '授权失败', icon: 'none' })
          wx.navigateBack({
            delta: 1
          })
        }
      } else {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法使用小程序部分功能!',
          showCancel: false,
          confirmText: '确认',
          success (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
              store.commit('user/SET_AUTHORIZE_USERINFO', false)
            }
          }
        })
        store.commit('user/SET_TOKEN', store.state.user.defaultToken)
      }
    }
  },
  computed: {
    wechat () {
      return require('@/assets/svg/wechat.svg')
    },
    bgImg () {
      return require('@/assets/login_bg.png')
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val) {
          this.actionContainerClass = 'auth-action-container'
        } else {
          this.actionContainerClass = 'auth-action-container auth-action-container--close'
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less">
page {
  background:#Fff;
}
.auth-action {
  position:absolute;
  top: 76px;
  left:0;
  width:100%;
  box-sizing:border-box;
  padding:0 15px;
  &__bg__img {
    margin-left:136px;
    margin-bottom: 75px;
    width: 93px;
    height: 84px;
  }

  &__title {
    display: flex;
    position: relative;
    margin-top: 10px;
    color: #999999;
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }

  &__button {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    height: 44px;
    width: 100%;
    margin-top: 18px;
    font-size: 15px;
    background-color: #f25a57 !important;

    &__img {
      width: 27px;
      height: 27px;
      margin-right: 4px;
    }
  }
}

.auth-action-line {
  display: block;
  width: 20%;
  border-top: 1px solid #DBDBDB;

  &--left {
    margin-right: 15px;
  }

  &--right {
    margin-left: 15px;
  }
}
</style>
