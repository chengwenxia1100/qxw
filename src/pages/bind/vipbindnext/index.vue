<template>
  <div class="vipbindnext_container">
    <div class="login_mess">
        <div class="left">
            <div class="slide2">
                <span>学生学号: </span><span>12323232323</span>
            </div>
            <div class="slide1">
                <div><span>学生姓名：</span><span class="con">网易云</span></div>
                <div><span>性别：</span><span class="con">男</span></div>
            </div>
            <div class="slide2">
                <span>就读学校: </span><span class="con">杭州高级中学</span>
            </div>
            <div class="slide3">
                <div><span>就读年级：</span><span class="con">初一</span></div>
                <div><span>班级：</span><span class="con">班</span></div>
            </div>
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
  </div>
</template>

<script>

export default {
    data () {
        return {
            lists: [
                {name: 'father', value: '父亲 ', checked: 'true'},
                {name: 'mother', value: '母亲'},
                {name: 'other', value: '其他'},
            ],
            isClick: true,
            bgcolor: '#f7536a',
            time:'发送验证码'
        }
    },
    mounted () {
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
        finished () {
            const url = '../../home/main'
            wx.switchTab({url})
        }
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
