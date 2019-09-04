<template>
  <div class="update_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <student-form 
      @studentName="studentName"
      @studentSex="studentSex"
      @studentSchool="studentSchool"
      @studentGrade="studentGrade"
      @studentClass="studentClass"
      @studentNo="studentNo"
    ></student-form>
    <div class="btn" @click="addFinished">完成</div>
    <div class="tip" @click="gotoVip">内部学员绑定通道></div>
  </div>
</template>

<script>
import studentForm from '@/components/form/studentForm'
import { addData } from '../../user.api'

export default {
  components: {
    studentForm
  },
  data () {
    return {
      studentNameVal: '',
      studentSexVal: 0,
      studentSchoolVal: '请输入就读学校',
      studentGradeVal: '请输入就读年级',
      studentClassVal: '',
      student_no: 0,
      loading: false,
      mess: {}
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
      this.loading = true
      this.addDataFun()
    },
    // 添加学员接口
    async addDataFun () {
        const data = await addData({
          s_realname: this.studentNameVal,
          sex: this.studentSexVal,
          grade: this.studentGradeVal,
          school: this.studentSchoolVal,
          class_id: this.studentClassVal,
          student_id: this.student_no
        })
        this.loading = false
        wx.navigateBack({ delta: 1 })
        // wx.reLaunch({ url: '../switchStudent/main' })
    },
    // 内部学员通道
    gotoVip () {
      wx.navigateTo({ url: '/pages/bind/vipbind/main' })
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
