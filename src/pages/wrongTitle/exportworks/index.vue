<template>
  <div class="export_box">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <div class="tip">
        本次导出{{total}}道题
    </div>
    <div class="send_con">
        <p>题目发送至邮箱，打印回家做</p>
        <div class="input">
            <input type="text" placeholder="请输入您的邮箱" v-model="emailValue">
            <div class="end" v-if="bg" :style="'background:url(' + bg + ') no-repeat center right;'" @click="switchTab">
               <span>{{emailText}}</span> 
            </div>
        </div>
        <!-- 邮箱下拉框 -->
        <div class="change_box" v-if="status">
          <ul>
            <li v-for="(list, i) in emailList" :key="i" @click="select(list)">{{list}}</li>
          </ul>
        </div>
    </div>
    <div class="btn" @click="send">
      发送
    </div>
    <div class="rule">
      <p>温馨提示：</p>
      <p>1.导出的错题本不带答案</p>
      <p>2.错题导出完成后可前往【我的】->【错题本导出记录】中查看导出详情</p>
      <p>3.掌上勤学提供错题本打印服务，前往导出详情中查看</p>
    </div>
    <!-- 发送成功-->
    <success-layer
    v-if="successStatus"
    @successStatus="successStatusFun"
    :emailName="emailName"></success-layer>
  </div>
</template>

<script>
import successLayer from '@/components/layer/successLayer'
import { exportMistakeBook, exportEmail } from '@/api/wrong'; 
import store from '@/store'

export default {
  components: {
    successLayer
  },
  data () {
    return {
      gradeVal: '',
      subjectVal: '',
      chapterVal: '',
      emailName: '',
      emailValue: '',
      total:0,
      num:0,
      status: false,
      successStatus: false,
      loading: false,
      emailText: '@qq.com',
      emailList: ['@qq.com','@126.com','@163.com','@139.com','@189.com','@sohu.com','@sina.com','@gmail.com']
    }
  },
  onLoad (options) {
    this.gradeVal = options.gradeVal
    this.subjectVal = options.subjectVal
    this.chapterVal = options.chapterVal
    this.total = options.total
    this.num = options.num
  },
  computed: {
    // email () {
    //   return store.state.mess.emailValue
    // },
    bg () {
      return require('@/assets/icon/icon_down2.png')
    }
  },
  mounted () {
    this.exportEmail()
    // if (this.email) {
    //   this.emailValue = this.email
    //   console.log(this.emailValue);
    // }
  },
  methods: {
    // 获取邮箱
    async exportEmail () {
      const data = await exportEmail({})
      this.loading = false
      if (data.email) {
        this.emailValue = data.email.split('@')[0]
        this.emailText = '@' + data.email.split('@')[1]
      } else {
        this.emailValue = ''
        this.emailText = '@qq.com'
      }
      
    },
    // 发送邮件
    send () {
      if (!this.emailValue) {
        wx.showToast({ title: '邮箱不能为空', icon: 'none' })
        return
      }
      this.loading = true
      this.emailName = this.emailValue + this.emailText
      // store.commit('set_emailValue', this.emailValue)
      setTimeout(() => { this.loading = false }, 2000);
      setTimeout(() => { this.successStatus = true }, 2200);
      exportMistakeBook({
        chapter: this.chapterVal,
        grade: this.gradeVal,
        subject_id: this.subjectVal,
        email: this.emailName
      }).then(data => {
        this.loading = false
      })
    },
    switchTab () {
      this.status = !this.status
      if (this.status) {
        this.bg =  require('@/assets/icon/icon_up2.png')
      } else {
        this.bg =  require('@/assets/icon/icon_down2.png')
      }
    },
    select (e) {
      this.emailText = e
      this.switchTab()
    },
    // 从子组件接收
    successStatusFun (val) {
      this.successStatus = false
    }
  }
}
</script>

<style lang='less'>
body {
  background:#fff;
}
.export_box {
  .change_box {
    background:#fff;
    position: absolute;
    right:0.7rem;
    top:2rem;
    ul {
      li {
        text-align:center;
        padding:0.3rem 0;
      }
    }
  }
  .tip {
      background:rgba(37, 167, 247, 0.2);
      font-size:0.26rem;
      color:#25A7F7;
      line-height: 0.64rem;
      padding:0 0.2rem;
  }
  .send_con {
      padding:0 0.36rem;
      p {
          font-size:0.26rem;
          color: #000;
          padding:0.28rem 0;
      }
      .input {
        display: flex;
        input {
          flex:1;
        }
        .end {
          width:1.8rem;
          background-size:0.64rem 0.64rem;
          span {
            line-height:0.4rem;
            padding-right:0.2rem;
          }
        }
      }
  }
  .btn {
    background: #25A7F7;
    text-align: center;
    height:0.96rem;
    line-height:0.96rem;
    width:5.4rem;
    border-radius:0.16rem;
    color:#fff;
    font-size:0.32rem;
    margin:0.8rem 0 0.8rem 0.96rem;
  }
  .rule {
    color:#999;
    font-size:0.24rem;
    padding:0.2rem;
    p {
      line-height:0.4rem;
    }
  }
}
</style>
