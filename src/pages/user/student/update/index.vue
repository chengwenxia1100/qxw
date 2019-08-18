<template>
  <div class="update_container">
    <student-form :studentId=student_id></student-form>
    <parents-form></parents-form>
    <div class="remove_tip" @click="removeBind">解除绑定</div>
    <div class="btn">完成</div>
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
      updataStudentData: {}
    }
  },
  computed: {
    student_id () {
      // return this.$mp.query.student_id
      return 39
    }
  },
  methods: {
    async updataStudentPage () {
        const data = await updataStudent({
          student_id: this.$mp.query.student_id
        })
        this.studentListData = data
    },
    // 解除绑定
    async removeBind () {
        const data = await removeBind({
          bind_id: this.$mp.query.bind_id
        })
        this.studentListData = data
    },
    // 单选框
    radioChange: e => {
        console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
    },
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
                wx.navigateBack({
                  delta: 1
                })
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
