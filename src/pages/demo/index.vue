<template>
  <div class="user_wrongTitle">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- 绑定学生信息 -->
    <bind-form 
      @studentName="studentName"
      @studentSex="studentSex"
      @studentSchool="studentSchool"
      @studentGrade="studentGrade"
      @studentClass="studentClass"
      @studentNo="studentNo"
    ></bind-form>
    <!-- <div class="btn">
      <div class="btn_con" @click="finished">完成</div>
    </div> -->
    <!-- 设置密码 -->
    <password-layer
    :passwordtip="passwordtip"
    :passwordLayer="passwordLayer"
    @passwordLayer="passwordLayerFun"
    @password="passwordFun"
  ></password-layer>
  </div>
</template>

<script>
import { gainCode, bindMessSubmit, getSchoolList, setPassword, checkPassword } from '../bind/bind.api'
import passwordLayer from '@/components/layer/passwordLayer'
import bindParents from '@/components/form/bindParents'
import bindForm from '@/components/form/bindForm'
import mpvuePicker from "mpvue-picker";

export default {
    components: {
        mpvuePicker,
        bindParents,
        passwordLayer,
        bindForm
    },
    data () {
        return {
          studentNameVal: '',
          studentSexVal: 0,
          studentSchoolVal: '请输入就读学校',
          studentGradeVal: '请输入就读年级',
          passwordtip: '请设置密码',
          studentClassVal: '',
          student_no: 0,
          studentId: 0,
          relationVal: 1,
          passwordType: 0,
          parentsNameVal: '',
          phoneVal: '',
          codeVal: '',
          loading: false,
          passwordLayer: false
        }
    },
    onLoad () {
    },
    methods: {
        // 填完信息提交
        finished () {
          if (!this.studentNameVal) {
              wx.showToast({ title: '请输入学生姓名', icon: 'none' })
              return
          } else if (!this.studentSexVal) {
              wx.showToast({ title: '请输入学生性别', icon: 'none' })
              return
          } else if (!this.studentGradeVal) {
              wx.showToast({ title: '请输入年级', icon: 'none' })
              return
          } else if (!this.studentSchoolVal) {
              wx.showToast({ title: '请输入学校', icon: 'none' })
              return
          } else if (!this.studentClassVal) {
              wx.showToast({ title: '请输入班级代码', icon: 'none' })
              return
          } else if (!this.parentsNameVal) {
              wx.showToast({ title: '请输入家长姓名', icon: 'none' })
              return
          } else if (!this.relationVal) {
              wx.showToast({ title: '请输入关系', icon: 'none' })
              return
          } else if (!this.phoneVal) {
              wx.showToast({ title: '请输入手机号码', icon: 'none' })
              return
          }else if (!this.codeVal) {
              wx.showToast({ title: '请输入验证码', icon: 'none' })
              return
          } else {
            this.loading = true
            this.setPassword()
          }
        },
        // 检测是否第一次绑定
        async setPassword () {
          const data = await setPassword({
              s_realname: this.studentNameVal,
              s_sex: this.studentSexVal,
              s_grade: this.studentGradeVal,
              s_school: this.studentSchoolVal,
              s_class: this.studentClassVal,
              student_no: this.student_no,
              p_realname: this.parentsNameVal,
              sms_code: this.codeVal,
              phone: this.phoneVal,
              relation_type: this.relationVal
          })
          this.studentId = data.student_id
          this.passwordType = data.password
          if(data.password == 1) {
            this.passwordLayer = true
            this.passwordtip = '设置密码'
          }else if(data.password == 2) {
            this.passwordLayer = true
            this.passwordtip = '确认密码'
            this.checkPassword()
          } else {
            this.bindMessSubmitData
          }
        },
        // 检测密码接口
        async checkPassword () {
          const data = await checkPassword({
            password: this.password,
            student_id: this.studentId
          })
          this.bindMessSubmitData()
        },
        // 点击提交接口
        async bindMessSubmitData () {
          const data = await bindMessSubmit({
              s_realname: this.studentNameVal,
              s_sex: this.studentSexVal,
              s_grade: this.studentGradeVal,
              s_school: this.studentSchoolVal,
              s_class: this.studentClassVal,
              student_no: this.student_no,
              p_realname: this.parentsNameVal,
              sms_code: this.codeVal,
              phone: this.phoneVal,
              relation_type: this.relationVal,
              password: this.password,
              student_id: this.studentId
          })
          this.loading = false
          this.passwordLayer = false
          // 跳转到下一页
          const url = '../../home/main'
          wx.reLaunch({url})
        },
        // 接收学生信息的子组件的传值
        studentName (val) {
          this.studentNameVal = val
        },
        studentSex (val) {
          this.studentSexVal = val
        },
        studentSchool (val) {
          console.log('studentSchool' + val)
          this.studentSchoolVal = val
        },
        studentGrade (val) {
          this.studentGradeVal = val
        },
        studentClass (val) {
          this.studentClassVal = val
        },
        studentNo (val) {
          this.student_no = val
        },
        // 接收家长信息的子组件的传值
        parentsName (val) {
            this.parentsNameVal = val
        },
        relation (val) {
            this.relationVal = val
        },
        phone (val) {
            this.phoneVal = val
        },
        code (val) {
            this.codeVal = val
        },
        // 接收设置密码子组件返回
        passwordLayerFun (val) {
          this.passwordLayer = val
        },
        passwordFun (val) {
          console.log(val)
          this.password = val
          if (this.passwordType === 1) {
            this.bindMessSubmitData()
            return
          }
          if (this.passwordType === 2) {
            this.checkPassword()
            return
          }
        },
        // 内部学员通道
        gotoVip () {
          wx.navigateTo({ url: '../vipbind/main' })
        }
    }
}
</script>

<style lang="less">
page {
  background: #f2f2f2;
}
.user_wrongTitle {
  font-size: 0.28rem;
  .list_same {
    display: flex;
    align-items: center;
    border-bottom: 0.02rem #f2f2f2 solid;
    padding: 0.2rem;
    color: #999;
    .tit {
      width: 1.4rem;
      color: #333;
      margin-right: 0.2rem;
      text-align: right;
    }
    .radio {
      flex:1;
      clear: both;
      overflow: hidden;
      .select_btn {
        margin-right:0.2rem;
        float:left;
        display: flex;
        align-items: center;
        img {
          width:0.64rem;
          height:0.64rem;
        }
        span {
          line-height:0.64rem;
        }
      }
    }
    
    input {
      flex: 1;
    }
    .input {
      flex: 1;
      display: flex;
      align-items: center;
      input {
        flex: 1;
      }
      span {
        width: 1.4rem;
        text-align: center;
        color: #fff;
        padding: 0.1rem;
        border: 0.02rem #ddd solid;
        border-radius: 0.18rem;
      }
    }
  }
  // .student_mess {
  //   background: #fff;
  //   padding: 0.2rem 0;
  //   .list {
  //     .list_same;
  //   }
  // }
  // .parents_mess {
  //   background: #fff;
  //   margin-top: 0.2rem;
  //   .list {
  //     .list_same;
  //   }
  // }
  .btn {
    margin: 0.4rem 0;
    .btn_con {
      background: #25a7f7;
      color: #fff;
      width: 3rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      border-radius: 0.16rem;
      margin: 0 auto;
    }
  }
  .tip {
    color: #25a7f7;
    text-align: right;
    margin-right: 0.3rem;
  }
}
</style>
