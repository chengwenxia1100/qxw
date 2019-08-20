<template>
  <div class="user_container">
    <div class="user_mess">
      <img :src="userInfos.avatarUrl"  v-if="userInfos.avatarUrl">
      <img src="/static/images/user.png" v-else />
      <div class="mess" @click="jump('login')">
        <p><span>微信昵称:</span>
          <span v-if="userInfos.nickName">{{userInfos.nickName}}</span>
          <span v-else>请先授权</span>
        </p>
        <p><span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
          <span v-if="userdata.parent_realename">{{userdata.parent_realename}}</span>
          <span v-else>请绑定家长姓名</span>
        </p>
        <p><span>手机号码:</span>   
          <span v-if="userdata.parent_phone">{{userdata.parent_phone}}</span>
           <span v-else>请绑定家长姓名</span>
        </p>
      </div>
    </div>
    <div class="change_box" v-if="studentdata" @click="jump('toChange')">
      <img src="/static/svg/user_icon1.png" style="width:1.6rem;height:1.6rem;" />
      <div class="right">
        <p><span>当前学员： </span><span>{{studentdata.s_realname}}</span></p>
        <p>(点击可切换，添加学员，更新学员信息)</p>
      </div>
    </div>
    <div class="list">
      <ul>
        <li @click="toVip">
          <img src="/static/svg/user_icon2.png" style="width:1.6rem;height:1.6rem;" />
          <p>会员</p>
        </li>
        <li @click="toInstruction">
          <img src="/static/svg/user_icon3.png" style="width:1.6rem;height:1.6rem;" />
          <p>使用说明</p>
        </li>
        <li>
          <img src="/static/svg/user_icon4.png" style="width:1.6rem;height:1.6rem;" />
          <button open-type='contact' class='' session-from='weapp'>在线客服</button> 
        </li>
        <li @click="toAbout">
          <img src="/static/svg/user_icon5.png" style="width:1.6rem;height:1.6rem;" />
          <p>关于勤学</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getUser } from './user.api'
import store from '@/store'

export default {
  data () {
    return {
      userdata: {},
      studentdata: {},
      userInfos: {}
    }
  },
  onLoad () {
    this.getUser()
  },
  computed: {
    userInfo () {
      return store.state.user.authorize.userInfo // 获取缓存的 userInfo 有代表已授权过
    }
  },
  watch: {
    userInfo: {
      immediate: true,
      handler (val) {
        if (val) {
          wx.getUserInfo({
            success: (res) => {
              this.userInfos = JSON.parse(res.rawData)
              console.log(this.userInfos)
              setTimeout(() => {
                this.getUser()
              }, 1000)
            }
          })
        }
      }
    }
  },
  methods: {
    async getUser () {
        const data = await getUser({})
        this.userdata = data
        this.studentdata = data.student_info
        console.log(data)
    },
    // 切换学员
    jump(type) {
      if (!this.userInfo) { // 如果用户信息不存在
        this.userLogin()
      } else {
        switch (type) {
          case 'login':
            wx.navigateTo({ url: '/pages/auth/main' }) // 跳转到授权页面
            break
          case 'toChange':
            wx.navigateTo({ url: './student/switchStudent/main' }) // 跳转到学员列表
            break
        }
      }
    },
    // 会员
    toVip () {
      const url = './student/switchStudent/main';
      wx.navigateTo({ url })
    },
    // 使用说明toAbout
    toInstruction () {
      const url = './instruction/main';
      wx.navigateTo({ url })
    },
    // 关于勤学
    toAbout () {
      const url = './about/main';
      wx.navigateTo({ url })
    },
  }
}
</script>

<style lang="less">
page {
  background:#f2f2f2;
  font-size:0.28rem;
}
.user_container {
  .user_mess {
    display: flex;
    margin:0.1rem 0;
    background:#fff;
    font-size:0.28rem;
    img {
      width:1.6rem;
      height:1.6rem;
      border-radius: 50%;
    }
    div {
      flex:1;
      p {
        padding:0.1rem 0;
        span:first-child {
          color:#333;
          padding-right:0.2rem;
        }
        span:nth-child(2) {
          color:#999;
        }
      }
    }
  }
  .change_box {
    display: flex;
    padding:0.2rem;
    background:#fff;
    margin:0.2rem 0;
    img {
      margin-right:0.5rem;
    }
    .right {
      flex:1;
      p {
        font-size:0.28rem;
        padding:0.1rem 0;
        color:#999;
        span:first-child {
          color:#333;
          padding-right:0.2rem;
        }
        span:nth-child(2) {
          color:#999;
        }
      }
    }
  }
  .list {
    ul {
      li {
        display:flex;
        background:#fff;
        border-bottom:0.05rem #f2f2f2 solid;
        padding:0.2rem;
        img {
          margin-right:0.4rem;
        }
        p {
          flex:1;
          display:flex;
          align-items: center;
        }
        button {
          background:#fff;
          text-align:left;
          flex:1;
          display:flex;
          align-items: center;
          height:0.48rem;
          font-size:0.28rem;
          padding-left:0;
        }
        button::after{
          border: none;
        }
      }
    }
  }
}
</style>
