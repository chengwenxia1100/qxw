<template>
  <div class="layer_success">
    <div class="success">
      <!-- <img :src="icon" class="icon"> -->
      <div class="con">
        <p class="p">发送成功</p>
        <div class="tip_txt">&nbsp;&nbsp;&nbsp;&nbsp;本题已发送至邮箱<span>{{emailName}}</span>,请注意查收！</div>
        <div class="rule_af">
          <p>温馨提示：</p>
          <p>1.导出的错题本不带答案</p>
          <p>2.错题导出完成后可前往【我的】->【错题本导出记录】中查看导出详情</p>
          <p>3.掌上勤学提供错题本打印服务，前往导出详情中查看</p>
        </div>
        <div class="know" @click="keno">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    emailName: {
      default: ''
    }
  },
  data () {
    return {
      icon: require('@/assets/img/success.png'),
    }
  },
  methods: {
    keno () {
      this.$emit('successStatus', 1)
      wx.navigateBack({ delta: 1 })
    }
  }
}
</script>

<style lang='less' scoped>
.layer_success {
  height:100vh;
  width:100%;
  position: fixed;
  top:0;
  lefT:0;
  background:rgba(0, 0, 0, 0.5);
  .success {
    position: fixed;
    top:20%;
    .icon {
      width: 1.28rem;
      height: 1.28rem;
      margin:0 0 -0.5rem 3rem;
    }
    .con {
      background:#fff;
      margin:0 0.6rem;
      width:5.6rem;
      padding:0.3rem;
      .p {
        font-size:0.36rem;
        color: #25A7F7;
        text-align:center;
        padding:0.3rem 0;
      }
      .tip_txt {
        font-size:0.28rem;
        color:#000;
        span {
          color: #25A7F7;
        }
      }
      .rule_af {
        color:#999;
        font-size:0.24rem;
        padding:0.2rem;
        p {
          line-height:0.4rem;
        }
      }
      .know {
        color: #25A7F7;
        font-size:0.32rem;
        text-align:center;
      }
    }
  }
}
</style>
