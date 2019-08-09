<template>
  <div class="form_box">
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
        // categoryId () {
        //   return this.$mp.query.id
        // }
    },
    methods: {
        // 单选框
        radioChange: e => {
            console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
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
