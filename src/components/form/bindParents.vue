<template>
  <div class="parents_mess">
    <div class="list">
      <div class="tit">您的姓名</div>
      <input type="text" placeholder="请输入您的姓名" v-model="parentsName" />
    </div>
    <div class="list">
        <div class="tit">关系</div>
        <div class="radio">
            <div class="select_btn" @click="relativeRadio(1)">
                <img :src="selectIcon" v-if="relation == 1">
                <img :src="noselectIcon" v-else>
                <span>父亲</span>
            </div>
            <div class="select_btn" @click="relativeRadio(2)">
                <img :src="selectIcon" v-if="relation == 2">
                <img :src="noselectIcon" v-else>
                <span>母亲</span>
            </div>
            <div class="select_btn" @click="relativeRadio(0)">
                <img :src="selectIcon" v-if="relation == 0">
                <img :src="noselectIcon" v-else>
                <span>其他</span>
            </div>
        </div>
    </div>
    <div class="list">
      <div class="tit">联系方式</div>
      <!-- oninput ="value=value.replace(/[^\d]/g,'')" -->
      <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="11"  @blur="blur" />
    </div>
    <div class="list">
      <div class="tit">验证码</div>
      <div class="input">
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <span @tap="isClick && gainCodeMess()" :style="'background:' + bgcolor">{{time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { gainCode } from '@/pages/bind/bind.api';

export default {
    data () {
        return {
            // relativelists: [
            //     {name: '1', value: '父亲 ', checked: 'true'},
            //     {name: '2', value: '母亲'},
            //     {name: '0', value: '其他'},
            // ],
            isClick: true,
            bgcolor: '#f7536a',
            time:'发送验证码',
            relation: 1,
            parentsName: '',
            phone: '',
            code: ''
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
    watch: {
        parentsName: {
            immediate: true,
            handler (val) {
                this.$emit('parentsName', val)
            }
        },
        relation: {
            immediate: true,
            handler (val) {
                this.$emit('relation', val)
            }
        },
        phone: {
            immediate: true,
            handler (val) {
                this.$emit('phone', val)
            }
        },
        code: {
            immediate: true,
            handler (val) {
                this.$emit('code', val)
            }
        }
    },
    onShow () {
        this.isClick = true;
        let interval = this.interval;    // 保存定时器的id
        clearInterval(interval);
        this.time = '获取验证码';
    },
    methods: {
        relativeRadio (value) {
            this.relation = value
        },
        gainCodeMess () {
            if(!this.phone){
                wx.showToast({ title: '请输入手机号码', icon: 'none' })
                return
            }else {
                this.gainCode()
            }
            
        },
        // 获取验证码
        async gainCode () {
            const data = await gainCode({
                phone: this.phone
            })
            this.isClick = false;
            let times = 60; // 用于倒计时
            this.time = times+'s';
            this.bgcolor = '#ddd';
            this.interval = setInterval(() =>{
                times--;
                this.time = times+'s';
                if(times < 0){
                this.time = '重新获取';
                this.bgcolor = '#f7536a';
                this.isClick = true;
                clearInterval(this.interval);
                }
            },1000)
        },
        blur () {
            let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if (!reg.test(this.phone)) {
                if (this.phone != '') {
                    wx.showToast({ title: '手机号格式不正确', icon: 'none' })
                }
            }
        },
        radioRelativeChange(e) {
            this.relation = e.mp.detail.value
        }
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
