<template>
  <div class="update_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- <student-form 
      @studentName="studentName"
      @studentSex="studentSex"
      @studentSchool="studentSchool"
      @studentGrade="studentGrade"
      @studentClass="studentClass"
      @studentNo="studentNo"
    ></student-form> -->
    <bind-form 
      @studentName="studentName"
      @studentSex="studentSex"
      @studentSchool="studentSchool"
      @studentGrade="studentGrade"
      @studentClass="studentClass"
      @studentNo="studentNo"
    ></bind-form>
    <div class="btn" @click="addFinished">完成</div>
    <div class="tip" @click="gotoVip">内部学员绑定通道></div>
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
import passwordLayer from '@/components/layer/passwordLayer'
import studentForm from '@/components/form/studentForm'
import { addData, setPassword, checkPassword } from '../../user.api'
import bindForm from '@/components/form/bindForm' // 使用下拉组件

export default {
  components: {
    studentForm,
    passwordLayer,
    bindForm
  },
  data () {
    return {
      studentNameVal: '',
      studentSexVal: 0,
      studentSchoolVal: '请输入就读学校',
      studentGradeVal: '请输入就读年级',
      passwordtip: '',
      studentClassVal: '',
      student_no: 0,
      password: 0, // 密码
      loading: false,
      passwordLayer: false, //设置密码弹窗
      mess: {},
      studentId: 0
    }
  },
  onLoad (option) {
    this.mess = option
  },
  methods: {
    // 接收子组件的传值
    studentName (val) {
      this.studentNameVal = val
    },
    studentSex (val) {
      this.studentSexVal = val
    },
    studentSchool (val) {
      this.studentSchoolVal = val
    },
    studentGrade (val) {
      this.studentGradeVal = val
    },
    studentClass (val) {
      this.studentClassVal = val
    },
    studentNo (val) { // 不是内部学员没有这个值
      this.student_no = val
    },
    // 点击完成
    addFinished () {
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
      } else {
          this.loading = true
          this.setPassword()
      }
    },
    // 添加学员接口
    async addDataFun () {
        const data = await addData({
          s_realname: this.studentNameVal,
          sex: this.studentSexVal,
          grade: this.studentGradeVal,
          school: this.studentSchoolVal,
          class_id: this.studentClassVal,
          student_id: this.student_no,
          password: this.password
        })
        this.loading = false
        this.passwordLayer = false
        wx.showToast({ title: '添加成功', icon: 'right' })
        wx.navigateBack({ delta: 1 })
        // wx.reLaunch({ url: '../switchStudent/main' })
    },
    // 内部学员通道
    gotoVip () {
      wx.navigateTo({ url: '/pages/bind/vipbind/main' })
    },
    // 接收设置密码子组件返回
    passwordLayerFun (val) {
      this.passwordLayer = val
    },
    passwordFun (val) {
      this.password = val
      if (this.passwordType === 1 && val) {
        this.addDataFun()
        return
      }
      if (this.passwordType === 2 && val)  {
        this.checkPassword()
        return
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
        // this.checkPassword()
      } else {
        this.checkPassword()
      }
    },
    // 确定密码接口
    async checkPassword () {
      const data = await checkPassword({
        password: this.password,
        student_id: this.studentId
      })
      if(data.success) {
        this.addDataFun()
      }
    }
  },
  onUnload () {
    if (this.mess.from === 'home') { 
      wx.reLaunch({
        url:'/pages/home/main'
      })
    }
  }
}
</script>

<style lang="less">
page {
    background:#f2f2f2;
    font-size:0.28rem;
} 
.update_container {
  .btn {
    color:#fff;
    background:#25a7f7;
    width: 1.6rem;
    height: 0.6rem;
    line-height:0.6rem;
    text-align:center;
    border-radius: 0.08rem;
    margin:0.2rem auto;
  }
  .tip {
    color: #25a7f7;
    text-align: right;
    margin-right: 0.3rem;
  }
}
</style>
