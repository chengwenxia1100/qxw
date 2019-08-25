<template>
  <div class="form_box">
    <div class="student_mess">
        <div class="list">
            <div class="tit">学生姓名</div>
            <div class="show" v-if="studentId">{{sName}}</div>
            <input type="text" placeholder="请输入您孩子的姓名" v-model="sName" v-else>
        </div>
        <div class="list">
            <div class="tit">性别</div>
            <radio-group class="radio-group" @change="radioChange">
                <label v-for="item in items" :key="item.name">
                    <radio color='#EA5A49' :value="item.name" :checked="item.checked"/>{{item.value}}
                </label>
            </radio-group>
        </div>
        <div class="list">
            <div class="tit">就读年级</div>
            <div class="show" v-if="studentId">{{grade}}</div>
            <div class="input" v-else @click="showPicker">{{gradeval}}</div>
            <mpvue-picker
            ref="mpvuePicker"
            :mode="mode"
            :pickerValueDefault="pickerValueDefault"
            @onConfirm="onGradeConfirm"
            :pickerValueArray="pickerValueArray" />
        </div>
        <div class="list">
            <div class="tit">就读学校</div>
            <div class="show" v-if="studentId">{{school}}</div>
            <div class="input" @click="showPickerschool" v-else>{{school}}</div>
            <mpvue-picker
            ref="mpvuePickerschool"
            :mode="mode"
            :pickerValueDefault="pickerValueDefault"
            @onConfirm="onSchoolConfirm"
            :pickerValueArray="pickerValueArrayschool" />
        </div>
        <div class="list">
            <div class="tit">班级代码</div>
            <input type="text" placeholder="请输入班级代码(选填)" v-model="classNum" >
        </div>
    </div>
  </div>
</template>

<script>
import mpvuePicker from "mpvue-picker";
import { updataStudentPage, getSchoolList } from '@/api/student'

export default {
    components: {
        mpvuePicker
    },
    props: {
        studentId: {
            default: ''
        }
    },
    data () {
        return {
            items: [
                {name: '0', value: '男' , checked: 'true'},
                {name: '1', value: '女'}
            ],
            mode: 'selector',
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
            pickerValueArrayschool: [],
            pickerValueDefault: [3],
            studentListData: {},
            isClick: true,
            bgcolor: '#f7536a',
            time:'发送验证码',
            // 表单信息
            sName: '',
            sex: 0,
            school: '请输入就读学校(必填)',
            grade: '',
            gradeval: '请输入就读年级(必填)',
            classNum: ''
        }
    },
    watch: {
       sName: {
            handler (val) {
                this.$emit('studentName', val)
            },
            immediate: true
       },
       sex: {
            handler (val) {
                this.$emit('studentSex', val)
            },
            immediate: true
       },
       school: {
            handler (val) {
                console.log(val)
                this.$emit('studentSchool', val)
            },
            immediate: true
       },
       grade: {
            handler (val) {
                this.$emit('studentGrade', val)
            },
            immediate: true
       },
       classNum: {
           handler (val) {
               this.$emit('studentClass', val)
           },
           immediate: true
       }
    },
    onLoad () {
        if (this.studentId) { 
            this.updataStudentPage()  
        }
        this.getSchoolList() 
    },
    methods: {
        async updataStudentPage () {
            const data = await updataStudentPage({
                student_id: this.studentId
            })
            this.$emit('studentNo', data.id)
            this.sName = data.s_realname
            this.sex = data.sex
            this.school = data.school
            this.grade = data.grade
            this.class = data.class
            this.studentListData = data
        },
        // 添加学员接口
        async getSchoolList () {
            const data = await getSchoolList({})
            this.pickerValueArrayschool = data
        },
        // 单选框
        radioChange: e => {
            console.log('radio发生change事件，携带value值为：', e.mp.detail.name)
        },
        showPicker () {
            this.$refs.mpvuePicker.show()
        },
        showPickerschool () {
            this.$refs.mpvuePickerschool.show()
        },
        onGradeConfirm (e) {
            this.gradeval = e.label
            this.grade = e.value[0]
            console.log(e.value[0])
        },
        onSchoolConfirm (e) {
            this.school = e.label
        },
        init () {
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
    background:#f2f2f2;
}
.form_box {
    font-size:0.28rem;
    .list_same {
        display: flex;
        align-items: center;
        border-bottom:0.02rem #f2f2f2 solid;
        padding:0.2rem;
        color:#999;
        .tit {
            width:1.4rem;
            color:#333;
            margin-right:0.2rem;
            text-align:right;
        }
        .show {
            flex:1;
        }
        input {
            flex:1;
        }
        .input {
            flex:1;
            display: flex;
            align-items: center;
            input {
                flex:1;

            }
            span {
                width:1.4rem;
                text-align:center;
                color:#fff;
                padding:0.1rem;
                border:0.02rem #ddd solid;
                border-radius: 0.18rem;
            }
        }
    }
    .student_mess {
        background:#fff;
        padding:0.2rem 0;
        .list {
            .list_same
        }
    }
}
</style>
