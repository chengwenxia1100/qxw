<template>
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
</template>

<script>
import { gainCode } from '@/pages/bind/bind.api';

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
            time:'发送验证码',
            parentsName: '',
            relation: 1,
            phone: '',
            code: ''
        }
    },
    computed: {
        relation () {
            return 1
        }
    },
    watch: {
        parentsName: {
            handler (val) {
                this.$emit('parentsName', val)
            }
        },
        relation: {
            handler (val) {
                this.$emit('relation', val)
            }
        },
        phone: {
            handler (val) {
                this.$emit('phone', val)
            }
        },
        code: {
            handler (val) {
                this.$emit('code', val)
            }
        }
    },
    methods: {
        // 获取验证码
        async gainCode () {
            if(!this.phone){
                wx.showToast({ title: '请输入手机号码', icon: 'none' })
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
        radioChange_relation (e) {
            this.relation = e.mp.detail.value
        },
    }
}
</script>

<style lang="less">
page {
    background:#f2f2f2;
    font-size: 0.28rem;
}
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
.parents_mess {
    background:#fff;
    margin-top:0.2rem;
    color:#333;
    .list {
        .list_same
    }
}
</style>
