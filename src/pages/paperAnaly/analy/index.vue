<template>
  <div class="analy_container">
    <div class="paper_list">
      <div class="list">
        <img src="/static/images/bg.jpg">
        <div class="middle">
          <p>作业本一</p>
          <p>初二上册</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <p class="mark">101</p>
        </div>
      </div>
    </div>
    <div class="chart_con">     
        <div class="tab">
            <div class="btn">
                得分情况
            </div>
            <div class="btn">
                失分情况
            </div>
            <div class="btn">
                得分率
            </div>
        </div>
        <div class="con">
            <fan-chart></fan-chart>
        </div>
    </div>
    <div class="potic">
        <h2>重难点题型</h2>
        <table style="width:100%">
            <tr>
                <td rowspan="4">1212</td>
                <td>
                    <tr>1</tr>
                    <tr>1</tr>
                    <tr>1</tr>
                    <tr>1</tr>
                </td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import fanChart from '@/components/echart/fanChart'

export default {
  components: {
    fanChart
  },
  data () {
    return {
      macklayer: false, // 弹窗的显示与隐藏
      tip:false, // 弹窗中未输入考试成绩中的提示
      value: '', // 考试成绩的值
      on: true
    }
  },
  mounted () {
  },
  methods: {
    // 去登记
    goRegister () {
      this.macklayer = true;
    },
    close () {
      this.macklayer = false;
    },
    confirm () {
      if (this.value) {
        console.log(this.value)
        this.macklayer = false;
      } else {
        this.tip = true;
      }
    }
  }
}
</script>

<style lang="less">
.analy_container {
  .list {
    padding:0.2rem 0.3rem;
    display: flex;
    background:#fff;
    img {
      width:1.5rem;
      height:2rem;
    }
    .middle {
      flex:1;
      padding:0.1rem 0.2rem;
      p {
        padding:0.1rem 0;
      }
      p:nth-child(2) {
        color:#666;
      }
      p:nth-child(3) {
        color:#666;
      }
    }
    .status {
      width:2rem;
      padding:0.1rem 0;
      display: flex;
      align-items: center;
      position:relative;
      p {
        font-size:0.42rem;
        color:#707070;
        font-weight:bold;
      }
      .mark {
        font-size:0.64rem;
        color:#e12a22;
      }
    }
  }
  .chart_con {
    margin:0.2rem 0;
    background:#fff;
    height:5.4rem;
    .tab {
        clear:both;
        overflow: hidden;
        .btn {
            width:1.6rem;
            height:0.6rem;
            float:left;
            color:#1296db;
            line-height:0.6rem;
            text-align:center;
            border-radius:0.12rem;
            margin:0.2rem;
            border:0.02rem #1296db solid;
        }
        .on {
            background: #1296db;
            color:#fff;
        }
    }
  }
  .potic {
    h2 {
        padding:0.1rem 0.2rem;
    }
  }
}
</style>
