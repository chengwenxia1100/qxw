<template>
  <div class="update_container">
    <student-form 
      @studentName="studentName"
      @studentSex="studentSex"
      @studentSchool="studentSchool"
      @studentGrade="studentGrade"
      @studentClass="studentClass"
      @studentNo="studentNo"
    ></student-form>
    <div class="btn" @click="addFinished">完成</div>
    <div class="btn" v-if="lengthMax" style="background:#ddd">完成</div>
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
      lengthMax: false
    }
  },
  computed: {
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
      console.log(val)
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
    addFinished () {
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
          relation_type: this.relative,
          student_id: this.student_no
        })
        wx.reLaunch({ url: '../../main' })
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
    background:#64af08;
    width: 1.6rem;
    height: 0.6rem;
    line-height:0.6rem;
    text-align:center;
    border-radius: 0.08rem;
    margin:0.2rem auto;
  }
}
</style>
