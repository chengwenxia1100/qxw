<template>
  <div class="user_wrongTitle">
    <div class="student_mess">
      <div class="list">
        <div class="tit">学生姓名</div>
        <input type="text" placeholder="请输入您孩子的姓名" v-model="name" />
      </div>
      <div class="list">
        <div class="tit">性别</div>
        <radio-group class="radio-group" @change="radioChange">
          <label v-for="item in items" :key="item.name">
            <radio color="#EA5A49" :value="item.name" :checked="item.checked" />
            {{item.value}}
          </label>
        </radio-group>
      </div>
      <div class="list">
        <div class="tit">就读年级</div>
        <div class="input" @click="showPicker">{{grade}}</div>
        <mpvue-picker
          ref="mpvuePicker"
          :mode="mode"
          :pickerValueDefault="pickerValueDefault"
          @onConfirm="ongradeConfirm"
          :pickerValueArray="pickerValueArray"
        />
      </div>
      <div class="list">
        <div class="tit">就读学校</div>
        <div class="input" @click="showPickerschool">{{school}}</div>
        <mpvue-picker
          ref="mpvuePickerschool"
          :mode="mode"
          :pickerValueDefault="pickerValueDefault"
          @onConfirm="onschoolConfirm"
          :pickerValueArray="pickerValueArrayschool"
        />
      </div>
      <div class="list">
        <div class="tit">班级代码</div>
        <input type="text" placeholder="请输入班级代码" v-model="gradeNum"/>
      </div>
    </div>
    <bind-parents 
        @parentsName="parentsName" 
        @relation="relation"
        @phone="phone"
        @code="code">
    </bind-parents>
    <div class="btn">
      <div class="btn_con" @click="finished">完成</div>
    </div>
    <div class="tip" @click="gotoVip">内部学员绑定通道></div>
  </div>
</template>

<script>
import bindParents from '@/components/form/bindParents'
import { gainCode, bindMessSubmit, getSchoolList } from '../bind.api';
import mpvuePicker from "mpvue-picker";

export default {
    components: {
        mpvuePicker,
        bindParents
    },
    data () {
        return {
            mode: 'selector', // 选择下拉框
            items: [
                {name: '1', value: '男' , checked: 'true'},
                {name: '2', value: '女'}
            ],
            lists: [
                {name: '1', value: '父亲 ', checked: 'true'},
                {name: '2', value: '母亲'},
                {name: '0', value: '其他'},
            ],
            pickerValueArray: [
                {
                    label: '初一',
                    value: 7
                },
                {
                    label: '初二',
                    value: 8
                },
                {
                    label: '初三',
                    value: 9
                },
                {
                    label: '高一',
                    value: 10
                },
                {
                    label: '高二',
                    value: 11
                },
                {
                    label: '高三',
                    value: 12
                }
            ],
            pickerValueArrayschool: [
                
            ],
            pickerValueDefault: [3],
            isClick: true,
            bgcolor: '#f7536a',
            time:'发送验证码',
            grade: '请输入就读年级',
            school: '请输入就读学校',
            parentsNameVal: '',
            relationVal: 1,
            phoneVal: '',
            codeVal: ''
        }
    },
    mounted () {
      this.getSchoolListData()
    },
    methods: {
        // 接收子组件的传值
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
        // 填完信息提交
        finished () {
          if (!this.name) {
              wx.showToast({ title: '请输入学生姓名', icon: 'none' })
              return
          } else if (!this.sex) {
              wx.showToast({ title: '请输入学生性别', icon: 'none' })
              return
          } else if (!this.grade) {
              wx.showToast({ title: '请输入年级', icon: 'none' })
              return
          } else if (!this.school) {
              wx.showToast({ title: '请输入学校', icon: 'none' })
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
              this.bindMessSubmitData()
          }
        },
        // 点击提交接口
        async bindMessSubmitData () {
            const data = await bindMessSubmit({
                sms_code: this.codeVal,
                p_realname: this.parentsNameVal,
                phone: this.phoneVal,
                s_realname: this.name,
                s_sex: this.sex,
                s_grade: this.grade,
                s_school: this.school,
                s_class: this.gradeNum,
                relation_type: this.relationVal,
                student_no: this.student_no
            })
            console.log(data)
            // 跳转到下一页
            const url = '../../home/main'
            wx.reLaunch({url})
        },
        // 获取学校列表接口
        async getSchoolListData () {
          const data = await getSchoolList({
          })
          this.pickerValueArrayschool = data;
          console.log(data)
        },
        // 单选框
        radioChange (e) {
            this.sex = e.mp.detail.value
        },
        radioChange_relation (e) {
            this.relation = e.mp.detail.value
        },
        // 下拉框
        showPicker () {
            this.$refs.mpvuePicker.show()
        },
        showPickerschool () {
            this.$refs.mpvuePickerschool.show()
        },
        // 下拉框确认
        ongradeConfirm (e) {
          this.grade = e.label
        },
        onschoolConfirm (e) {
          this.school = e.label
        },
        init () {
        },
        // 内部学员通道
        gotoVip () {
          const url = '../vipbind/main';
          wx.navigateTo({ url })
        }
    },
    computed: {
        sex () {
            return 1
        },
        relation () {
            return 1
        }
    },
    watch: {
        grade (val) {
            console.log(val)
        },
        sex (val) {
            return val
        }
    },
    // 前后台切换重置倒计时
    onshow() {
      this.isClick = true;
      let interval = this.interval;    // 保存定时器的id
      clearInterval(interval);
      this.time = '获取验证码';
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
  .student_mess {
    background: #fff;
    padding: 0.2rem 0;
    .list {
      .list_same;
    }
  }
  .parents_mess {
    background: #fff;
    margin-top: 0.2rem;
    .list {
      .list_same;
    }
  }
  .btn {
    margin: 0.4rem 0;
    .btn_con {
      background: #f7536a;
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
    color: #f7536a;
    text-align: right;
    margin-right: 0.3rem;
  }
}
</style>
