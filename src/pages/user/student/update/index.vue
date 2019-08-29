<template>
  <div class="update_container">
    <student-form 
      :studentId=student_id 
      @studentName="studentName"
      @studentSex="studentSex"
      @studentSchool="studentSchool"
      @studentGrade="studentGrade"
      @studentClass="studentClass"
      @studentNo="studentNo"
    ></student-form>
    <parents-form @relative="relative"></parents-form>
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
      relativeVal: 1,
      studentNameVal: '',
      studentSexVal: 0,
      studentSchoolVal: '请输入就读学校',
      studentGradeVal: '请输入就读年级',
      studentClassVal: '',
      student_no: 0,
      mess: {}
    }
  },
  onLoad(option) {
    this.mess = option
  },
  computed: {
    student_id () {
      return this.mess.student_id
    },
    bind_id () {
      return this.mess.bind_id
    }
  },
  methods: {
    // 接收家长关系子组件的传值
    relative (val) {
      this.relativeVal = val
    },
    //接收学生子组件的传值
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
    studentNo (val) {
      this.student_no = val
    },
    // 点击完成
    finished () {
      this.updataStudent()
    },
    // 更新学员接口
    async updataStudent () {
        const data = await updataStudent({
            s_realname: this.studentNameVal,
            s_sex: this.studentSexVal,
            s_grade: this.studentGradeVal,
            s_school: this.studentSchoolVal,
            // s_class: this.studentClassVal,
            // student_no: this.student_no,
            class_id: this.studentClassVal,
            relation_type: this.relativeVal,
            student_id: this.student_no
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
              bind_id: this.bind_id
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
    color:#25A7F7;
    padding:0.2rem 0;
  }
  .btn {
    color:#fff;
    background:#25A7F7;
    width: 1.6rem;
    height: 0.6rem;
    line-height:0.6rem;
    text-align:center;
    border-radius: 0.08rem;
    margin:0.2rem auto;
  }
}
</style>
