<template>
  <div class="export_box">
    <div class="tip">
        本次导出266道题，共计32页
    </div>
    <div class="send_con">
        <p>题目发送至邮箱，打印回家做</p>
        <div class="input">
            <input type="text" name="" id="" placeholder="请输入您的邮箱">
            <div class="end">
                @qq.com
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
  },
  data () {
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style lang='less'>
.export_box {
    .tip {
        background:rgba(37, 167, 247, 0.2);
        font-size:0.26rem;
        color:#25A7F7;
        line-height: 0.64rem;
        padding:0 0.2rem;
    }
    .send_con {
        padding:0 0.36rem;
        p {
            font-size:0.26rem;
            color: #000;
            padding:0.28rem 0;
        }
    }
}
</style>
