<template>
  <div class="user_wrongTitle">
    <div class="student_mess">
        <div class="list">
            <div class="tit">学生姓名</div>
            <input type="text" placeholder="请输入您孩子的姓名" v-bind:value="value">
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
            <div class="input" @click="showPicker">请输入就读年级</div>
            <mpvue-picker
            ref="mpvuePicker"
            :mode="mode"
            :pickerValueDefault="pickerValueDefault"
            @onChange="onChange"
            @onConfirm="onConfirm"
            @onCancel="onCancel"
            :pickerValueArray="pickerValueArray" />
        </div>
        <div class="list">
            <div class="tit">就读学校</div>
            <div class="input" @click="showPickerschool">请输入就读学校</div>
            <mpvue-picker
            ref="mpvuePickerschool"
            :mode="mode"
            :pickerValueDefault="pickerValueDefault"
            @onChange="onChange"
            @onConfirm="onConfirm"
            @onCancel="onCancel"
            :pickerValueArray="pickerValueArrayschool" />
        </div>
        <div class="list">
            <div class="tit">班级代码</div>
            <input type="text" placeholder="请输入班级代码">
        </div>
    </div>
    <div class="parents_mess">
        <div class="list">
            <div class="tit">您的姓名</div>
            <input type="text" placeholder="请输入您的姓名" v-bind:value="value">
        </div>
        <div class="list">
            <div class="tit">关系</div>
            <radio-group class="radio-group" @change="radioChange">
                <label v-for="item in lists" :key="item.name">
                    <radio color='#EA5A49' :value="item.name" :checked="item.checked"/>{{item.value}}
                </label>
            </radio-group>
        </div>
        <div class="list">
            <div class="tit">联系方式</div>
            <input type="text" placeholder="请输入手机号">
        </div>
        <div class="list">
            <div class="tit">验证码</div>
            <div class="input">
               <input type="text" placeholder="请输入验证码">
               <span @tap="isClick && gainCode()" :style="'background:' + bgcolor">{{time}}</span>
            </div>
        </div>
    </div>
    <div class="btn">
        <div class="btn_con" @click="finished">完成</div>
    </div>
    <div class="tip" @click="gotoVip">
        内部学员绑定通道>
    </div>
  </div>
</template>

<script>
import mpvuePicker from "mpvue-picker";

export default {
    components: {
        mpvuePicker
    },
    data () {
        return {
            items: [
                {name: 'boy', value: '男' , checked: 'true'},
                {name: 'girl', value: '女'}
            ],
            lists: [
                {name: 'father', value: '父亲 ', checked: 'true'},
                {name: 'mother', value: '母亲'},
                {name: 'other', value: '其他'},
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
            time:'发送验证码'
        }
    },
    computed: {
        categoryId () {
        return this.$mp.query.id
        }
    },
    methods: {
        // 单选框
        radioChange: e => {
            console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
        },
        // 获取验证码
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
        //   let flag = this.checkPhoneNum(this.phoneNum); //接受手机号码校验的返回值
        //   let mobile = this.phoneNum;
        //   if(flag){
            // get('/os-wx-bee/sso/captcha.html?mobile='+mobile+'&type=1',{}).then(res => {
            //   if (res.code === 0) {
                // this.isClick = false;
                // let times = 60; // 用于倒计时
                // this.time = times+'s';
                // this.interval = setInterval(() =>{
                //   times--;
                //   this.time = times+'s';
                //   if(times < 0){
                //     this.time = '重新获取';
                //     this.isClick = true;
                //     clearInterval(this.interval);
                //   }
                // },1000)
            //   }
            // }).catch(err => {
            //   console.log(err);
            // });
        //   }
        },
        showPicker () {
            this.$refs.mpvuePicker.show()
        },
        showPickerschool () {
            this.$refs.mpvuePickerschool.show()
        },
        onConfirm (e) {
            console.log(e)
        },
        onChange (e) {
            console.log(e)
        },
        onCancel (e) {
            console.log(e)
        },
        init () {
        },
        gotoVip () {
            const url = '../vipbind/main';
            wx.navigateTo({ url })
        },
        finished () {
            const url = '../../home/main'
            wx.switchTab({url})
        }
    },
    mounted () {
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
.user_wrongTitle {
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
    .parents_mess {
        background:#fff;
        margin-top:0.2rem;
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
    .tip {
        color:#f7536a;
        text-align:right;
        margin-right:0.3rem;
    }
}
</style>
