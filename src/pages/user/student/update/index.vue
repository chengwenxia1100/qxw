<template>
  <div class="update_container">
    <student-form 
      :studentId=student_id 
      @studentName="studentName"
      @studentSex="studentSex"
      @studentSchool="studentSchool"
      @studentGrade="studentGrade"
      @studentClass="studentClass"
      @relative="relative"
    ></student-form>
    <parents-form></parents-form>
    <div class="remove_tip" @click="removeBind">解除绑定</div>
    <div class="btn" @click="finished">完成</div>
  </div>
</template>

<script>
import studentForm from '@/components/form/studentForm'
import parentsForm from '@/components/form/parentsSelect'
import { updataStudent, removeBind } from '../../user.api'

export default {
  components: {
    studentForm, 
    parentsForm
  },
  data () {
    return {
      relative: 1,
      studentNameVal: '',
      studentSexVal: 0,
      studentSchoolVal: '请输入就读学校',
      studentGradeVal: '请输入就读年级',
      studentClassVal: '请输入班级代码'
    }
  },
  computed: {
    student_id () {
      // return this.$mp.query.student_id
      return 39
    }
  },
  methods: {
    // 接收子组件的传值
    relative (val) {
      this.studentNameVal = val
    },
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
    // 点击完成
    finished () {
        if (!this.studentNameVal) {
            wx.showToast({ title: '请输入学生姓名', icon: 'none' })
            return
        } else if (!this.studentSexVal) {
            wx.showToast({ title: '请输入学生性别', icon: 'none' })
            return
        } else if (!this.studentSchoolVal) {
            wx.showToast({ title: '请输入学生学校', icon: 'none' })
            return
        } else if (!this.studentGradeVal) {
            wx.showToast({ title: '请输入学生年级', icon: 'none' })
            return
        } else {
            this.updataStudent()
        }
    },
    // 更新学员接口
    async updataStudent () {
        const data = await updataStudent({
            student_id: this.studentNameVal,
            studentSexVal: this.studentSexVal,
            studentSchoolVal: this.studentSchoolVal,
            studentGradeVal: this.studentGradeVal,
            studentClassVal: this.studentClassVal
        })
        wx.reLaunch({ url: '../../main' })
    },
    // 解除绑定
    removeBind () {
      wx.showModal({
        title: '确认解除绑定',
        content: '取绑后信息填写正确可重新绑定',
        cancelColor: '#666',
        confirmText: '确认',
        confirmColor: '#EA5A49',
        success: (res) => {
          if (res.confirm) {
            // 请求解除绑定接口
            const data = removeBind({
              bind_id: this.$mp.query.bind_id
            })
            if (data) {
              wx.showToast({
                title: '成功',
                duration: 1000
              })
              setTimeout(() => {
                wx.reLaunch({ url: '../../main' })
              }, 1000);
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
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
  .remove_tip {
    width:90%;
    text-align:right;
    font-size:0.28rem;
    color:#EA5A49;
    padding:0.2rem 0;
  }
  .btn {
    color:#fff;
    background:#EA5A49;
    width: 1.6rem;
    height: 0.6rem;
    line-height:0.6rem;
    text-align:center;
    border-radius: 0.08rem;
    margin:0.2rem auto;
  }
}
</style>
