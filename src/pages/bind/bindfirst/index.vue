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
          @onChange="onChange"
          @onConfirm="onConfirm"
          @onCancel="onCancel"
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
          @onChange="onChange"
          @onConfirm="onConfirm"
          @onCancel="onCancel"
          :pickerValueArray="pickerValueArrayschool"
        />
      </div>
      <div class="list">
        <div class="tit">班级代码</div>
        <input type="text" placeholder="请输入班级代码" v-model="gradeNum"/>
      </div>
    </div>
    <div class="parents_mess">
      <div class="list">
        <div class="tit">您的姓名</div>
        <input type="text" placeholder="请输入您的姓名" v-model="parentsName" />
      </div>
      <div class="list">
        <div class="tit">关系</div>
        <radio-group class="radio-group" @change="radioChange_relation">
          <label v-for="item in lists" :key="item.name">
            <radio color="#EA5A49" :value="item.name" :checked="item.checked" />
            {{item.value}}
          </label>
        </radio-group>
      </div>
      <div class="list">
        <div class="tit">联系方式</div>
        <!-- oninput ="value=value.replace(/[^\d]/g,'')" -->
        <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="11" />
      </div>
      <div class="list">
        <div class="tit">验证码</div>
        <div class="input">
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <span @click="gainCode()" :style="'background:' + bgcolor">{{time}}</span>
        </div>
      </div>
    </div>
    <div class="btn">
      <div class="btn_con" @click="finished">完成</div>
    </div>
    <div class="tip" @click="gotoVip">内部学员绑定通道></div>
  </div>
</template>

<script>
import { gainCode, bindMessSubmit } from '../bind.api';
import mpvuePicker from "mpvue-picker";

export default {
    components: {
        mpvuePicker
    },
    data () {
        return {
            items: [
                {name: '1', value: '男' , checked: 'true'},
                {name: '2', value: '女'}
            ],
            lists: [
                {name: '1', value: '父亲 ', checked: 'true'},
                {name: '2', value: '母亲'},
                {name: '0', value: '其他'},
            ],
            mode: 'selector',
            pickerValueArray: [
                {
                    label: '一年级',
                    value: 1
                },
                {
                    label: '二年级',
                    value: 2
                }
            ],
            pickerValueArrayschool: [
                {
                    label: '开化中学',
                    value: 1
                },
                {
                    label: '华埠中学',
                    value: 2
                }
            ],
            pickerValueDefault: [3],
            isClick: true,
            bgcolor: '#f7536a',
            time:'发送验证码',
            grade: '一年级',
            school: '开化中学',
            phone:'',
            parentsName: '',
            code: ''
        }
    },
    methods: {
        // 单选框
        radioChange (e) {
            this.sex = e.mp.detail.value
        },
        radioChange_relation (e) {
            this.relation = e.mp.detail.value
        },
        // 获取验证码
        async gainCode () {
            if(!this.phone){
                console.log('请输入手机号码')
                return
            }
            setTimeout(() => {
                this.isClick = false;
                this.bgcolor = '#ddd';
                let times = 60; // 用于倒计时
                this.time = times+'s';
                this.interval = setInterval(() =>{
                    times--;
                    this.time = times+'s';
                    if(times < 0){
                        this.time = '重新获取';
                        this.isClick = true;
                        this.bgcolor = '#f7536a';
                        clearInterval(this.interval);
                    }
                },1000)
            }, 1000);
            const data = await gainCode({
                phone: this.phone
            })
            this.isClick = false;
            let times = 60; // 用于倒计时
            this.time = times+'s';
            this.interval = setInterval(() =>{
                times--;
                this.time = times+'s';
                if(times < 0){
                this.time = '重新获取';
                this.isClick = true;
                clearInterval(this.interval);
                }
            },1000)
        },
        // 填完信息提交
        finished () {
            console.log(this.name)
            if (!this.name) {
                console.log('请输入学生姓名')
                return
            } else if (!this.sex) {
                console.log('请输入学生性别')
                return
            } else if (!this.grade) {
                console.log('请输入年级')
                return
            } else if (!this.school) {
                console.log('请输入学校')
                return
            } else if (!this.parentsName) {
                console.log('请输入家长姓名')
                return
            } else if (!this.relation) {
                console.log('请输入关系')
                return
            } else if (!this.phone) {
                console.log('请输入手机号码')
                return
            }else if (!this.code) {
                console.log('请输入验证码')
                return
            } else {
                this.bindMessSubmitData()
            }
        },
        // 点击提交接口
        async bindMessSubmitData () {
            const data = await bindMessSubmit({
                token: '996836448fdfcb7867397bf35bef8b7f',
                sms_code: this.code,
                p_realname: this.parentsName,
                phone: this.phone,
                s_realname: this.name,
                s_sex: this.sex,
                s_grade: this.grade,
                s_school: this.school,
                s_class: this.gradeNum,
                relation_type: this.relation,
                student_no: this.student_no
            })
            console.log(data)
            // 跳转到下一页
            const url = '../../home/main'
            wx.reLaunch({url})
        },
        showPicker () {
            this.$refs.mpvuePicker.show()
        },
        showPickerschool () {
            this.$refs.mpvuePickerschool.show()
        },
        onConfirm (e) {
            console.log(e.label)
            this.grade = e.label
        },
        onChange(e) {
            console.log(e)
        },
        // onCancel (e) {
        //     console.log(e)
        // },
        init () {
        },
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
    mounted () {
        console.log(this.sex)
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
