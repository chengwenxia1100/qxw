<template>
  <div class="vipbind_container">
    <div class="input_cox">
        <div class="slide">
            <div class="tit">学生学号</div>
            <input type="text" placeholder="请输入您孩子在勤学的学号" v-bind:value="value">
        </div>
        <div class="slide">
            <div class="tit">学生姓名</div>
            <input type="text" placeholder="请输入您孩子的姓名" v-bind:value="value">
        </div>
    </div>
    <div class="tip">
        <p>请点击下方【在线客服】咨询学管师获取孩子学号</p>
    </div>
    <div class="btn">
        <div class="btn_con" @click="gotonext">下一步</div>
    </div>
    <div class="kefu">
        <button open-type='contact' session-from=''>在线客服</button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    gotonext () {
        const url = '../vipbindnext/main';
        wx.navigateTo({ url })
    }
  }
}
</script>

<style lang="less">
page {
    background:#f2f2f2;
    font-size:0.28rem;
}
.vipbind_container {
    .list_same {
        background:#fff;
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
    }
    .input_cox {
        padding:0.4rem;
        .slide {
            .list_same
        }
    }
    .tip {
        p {
            font-size:0.26rem;
            padding:0 0.5rem;
            text-align:center;
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
    .kefu {
        position: fixed;
        bottom:0.2rem;
        left:0;
        width:100%;
    }
}
</style>
