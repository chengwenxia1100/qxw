<template>
  <div class="vipbindnext_container">
    <div class="login_mess">
        <div class="left">
            <div class="slide2">
                <span>学生学号: </span><span>{{studentData.student_no}}</span>
            </div>
            <div class="slide1">
                <div><span>学生姓名：</span><span class="con">{{studentData.student_realename}}</span></div>
                <div><span>性别：</span>
                <span class="con" v-if="studentData.student_sex === 1">女</span>
                <span class="con" v-if="studentData.student_sex === 0">男</span></div>
            </div>
            <div class="slide2">
                <span>就读学校: </span><span class="con">{{studentData.student_school}}</span>
            </div>
            <div class="slide3">
                <div><span>就读年级：</span><span class="con">{{studentData.student_grade}}</span></div>
                <div><span>班级：</span><span class="con">{{studentData.student_class}}</span></div>
            </div>
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
  </div>
</template>

<script>
import bindParents from '@/components/form/bindParents'
import { bindMessSubmit } from '../bind.api';

export default {
    components: {
        bindParents
    },
    data () {
        return {
            lists: [
                {name: 'father', value: '父亲 ', checked: 'true'},
                {name: 'mother', value: '母亲'},
                {name: 'other', value: '其他'}, 
            ],
            studentData: {},
            isClick: true,
            bgcolor: '#f7536a',
            time:'发送验证码',
            parentsNameVal: '',
            relationVal: 1,
            phoneVal: '',
            codeVal: ''
        }
    },
    mounted () {
        console.log(this.student_realname)
        this.vipBindPage()
        // this.student_no = this.$mp.query.student_no
        // this.student_realname = this.$mp.query.student_realname
    },
    computed: {
        student_no () {
            return this.$mp.query.student_no
        },
        student_realname () {
            return this.$mp.query.student_realname
        }
    },
    methods: {
        gainCode:function() {
            console.log(this.isClick)
            if(!this.isClick){
                return;
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
        },
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
        finished () {
            console.log(this.parentsNameVal)
            if (!this.parentsNameVal) {
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
                this.vipBindFinish()
            }
        },
        // 页面接口
        async vipBindPage() {
            const data = await bindMessSubmit({
                token: '38c533200b8a205f7169de372195dfb0',
                student_no: this.student_no,
                student_realname: this.student_realname
            })
            this.studentData=data;
            console.log(data)
        },
        // 点击提交接口
        async vipBindFinish () {
            const data = await bindMessSubmit({
                token: '38c533200b8a205f7169de372195dfb0',
                sms_code: this.codeVal,
                p_realname: this.parentsNameVal,
                phone: this.phoneVal,
                relation_type: this.relationVal,
                student_no: this.student_no,
                student_realname: this.student_realname
            })
            console.log(data)
            // 跳转到下一页
            const url = '../../home/main'
            wx.reLaunch({url})
        },
    }
}
</script>

<style lang="less">
page {
    background:#f2f2f2;
}
.vipbindnext_container {
    font-size: 0.28rem;
    .list_same {
        display: flex;
        align-items: center;
        border-bottom:0.02rem #f2f2f2 solid;
        padding:0.2rem;
        color:#666;
        .tit {
            width:1.4rem;
            color:#333;
            margin-right:0.2rem;
            text-align:right;
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
    .login_mess {
        font-size:0.28rem;
        background:#fff;
        color:#333;
        padding:0.1rem 0;
        margin-top:0.2rem;
        .left {
            .slide_same {
                clear:both;
                overflow: hidden;
                padding:0.1rem 0.2rem 0.1rem 0.2rem;
                div {
                    float:left;
                }
                div:first-child {
                    margin-right:0.6rem;
                }
            }
            .slide1 {
                .slide_same
            }
            .slide2 {
                .slide_same
            }
            .slide3 {
                .slide_same
            }
            .con {
                color:#666;
            }
        }
    }
    .parents_mess {
        background:#fff;
        margin-top:0.2rem;
        color:#333;
        .list {
            .list_same
        }
    }
    .btn {
        margin:0.4rem 0;
        .btn_con {
            background:#f7536a;
            color:#fff;
            width:3rem;
            height:0.8rem;
            text-align:center;
            line-height:0.8rem;
            border-radius:0.16rem;
            margin:0 auto;
        }
    }
}
</style>
