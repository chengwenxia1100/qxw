<template>
    <div class="student_mess">
        <div class="list">
            <div class="tit">学生姓名</div>
            <!-- <div class="show" v-if="studentId">{{sName}}</div> -->
            <input type="text" placeholder="请输入您孩子的姓名" v-model="sName">
        </div>
        <div class="list">
            <div class="tit">性别</div>
            <div class="radio">
                <div class="select_btn" @click="sexRadio(1)">
                    <img :src="selectIcon" v-if="sex == 1">
                    <img :src="noselectIcon" v-else>
                    <span>男</span>
                </div>
                <div class="select_btn" @click="sexRadio(2)">
                    <img :src="selectIcon" v-if="sex == 2">
                    <img :src="noselectIcon" v-else>
                    <span>女</span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="tit">就读年级</div>
            <!-- <div class="show" v-if="studentId">{{grade}}</div> -->
            <div class="input" @click="showPicker">{{grade}}</div>
            <mpvue-picker
            ref="mpvuePicker"
            :mode="mode1"
            :pickerValueDefault="pickergradeDefault"
            @onConfirm="onGradeConfirm"
            :pickerValueArray="gradearray" />
        </div>
        <div class="list">
            <div class="tit">就读学校</div>
            <!-- <div class="show" v-if="studentId">{{school}}</div> -->
            <div class="input" @click="showPickerschool">{{school}}</div>
            <mpvue-picker
            ref="mpvuePickerschool"
            :mode="mode2"
            :pickerValueDefault="pickerschoolDefault"
            @onConfirm="onSchoolConfirm"
            :pickerValueArray="pickerValueArrayschool" />
        </div>
        <div class="list">
            <div class="tit">班级代码</div>
            <input type="text" placeholder="请输入班级代码" v-model="classNum" >
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
    data () {
        return {
            items: [
                {name: '0', value: '男' , checked: 'true'},
                {name: '1', value: '女'}
            ],
            mode: 'selector',
            gradearray: [
                {
                    label: '一年级',
                    value: 1
                },
                {
                    label: '二年级',
                    value: 2
                },
                {
                    label: '三年级',
                    value: 3
                },
                {
                    label: '四年级',
                    value: 4
                },
                {
                    label: '五年级',
                    value: 5
                },
                {
                    label: '六年级',
                    value: 6
                },
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
            pickergradeDefault: [1],
            pickerschoolDefault: [3],
            studentListData: {},
            isClick: true,
            bgcolor: '#f7536a',
            time:'发送验证码',
            // 表单信息
            sName: '',
            sex: 1,
            school: '请输入就读学校(必填)',
            grade: '请输入就读年级(必填)',
            gradeVal: '',
            schoolVal:'',
            classNum: '',
            student_id: '',
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
       schoolVal: {
            handler (val) {
                this.pickerschoolDefault = val
                this.$emit('studentSchool', val)
            },
            immediate: true
       },
       gradeVal: {
            handler (val) {
                this.pickergradeDefault = val
                this.$emit('studentGrade', val)
                this.school = '请输入就读学校(必填)'
                this.pickerValueArrayschool = []
                this.getSchoolList()
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
    computed: {
      selectIcon () {
        return require('@/assets/svg/radio_select.png')
      },
      noselectIcon () {
        return require('@/assets/svg/radio_noselect.png')
      }
    },
    onLoad (option) {
        if (option.student_id) {
            this.student_id = option.student_id
            this.updataStudentPage() 
        }
        this.getSchoolList() 
    },
    methods: {
        async updataStudentPage () {
            const data = await updataStudentPage({
                student_id: this.student_id
            })
            this.$emit('studentNo', data.id)
            this.sName = data.s_realname
            this.sex = data.sex
            this.school = data.school
            this.grade = data.grade
            this.class = data.class_id
            this.classNum = data.class_id
            this.$emit('schoolValdata', data.schoolVal)
            this.$emit('gradeValdata', data.gradeVal)
            this.studentListData = data
        },
        // 添加学员接口
        async getSchoolList () {
            const data = await getSchoolList({
                grade: this.gradeVal
            })
            this.pickerValueArrayschool = data
            console.log(this.this.pickerValueArrayschool )
            this.$forceUpdate();
        },
        // 单选框选择
        sexRadio (value) {
          this.sex = value
        },
        showPicker () {
            this.$refs.mpvuePicker.show()
        },
        showPickerschool () {
            this.$refs.mpvuePickerschool.show()
        },
        onGradeConfirm (e) {
            this.gradeVal = e.value[0]
            this.grade = e.label
        },
        onSchoolConfirm (e) {
            this.schoolVal = e.value[0]
            this.school = e.label
        }
    },
    onUnload () {
        this.pickerValueArrayschool = []
    }
}
</script>

<style lang="less">
page {
    background:#f2f2f2;
}
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
.student_mess {
    background: #fff;
    padding: 0.2rem 0;
    .list {
        .list_same;
    }
}
</style>
