<template>
  <div class="layer_box">
    <div class="layer">
      <div class="tit">题目详情<img src="../../assets/svg/close.png" @click="close"></div>
      <div class="con">
        <ul>
          <li><span>【答案】</span><span>A</span></li>
          <li><span>【来源】</span><span>受精卵发育开始，到胎儿从母体内产出为止，</span></li>
          <li><span>【难度】</span><span>1</span></li>
          <li><span>【知识点】</span><span>受精卵发育开始，到胎儿从母体内产出为止，</span></li>
        </ul>
      </div>
      <fan-chart></fan-chart>
    </div>
  </div>
</template>

<script>
import fanChart from '../echart/fanChart'

export default {
  components: {
    fanChart
  },
  props: {
    analyLayer: {
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    close () {
      this.analyLayer = false;
      this.$emit('analyLayer', this.analyLayer)
    }
  }
}
</script>

<style lang='less'>
.layer_box {
  width:100%;
  height:100%;
  background:rgba(100,100,100, 0.3);
  position: fixed;
  top:0;
  left:0;
  .layer {
    margin:20% 0 0 10%;
    width:80%;
    background:#fff;
    border-radius:0.04rem;
    .tit {
      font-size:0.32rem;
      width:100%;
      height:0.8rem;
      text-align:center;
      line-height:0.8rem;
      background:rgb(180, 178, 178);
      color:#fff;
      img {
        width: 0.36rem;
        height: 0.36rem;
        float:right;
        margin-right:0.3rem;
        margin-top:0.3rem;
      }
    }
    .con {
      padding:0.2rem;
      ul {
        li {
          span:first-child {
            font-weight:bold;
            font-size:0.26rem;
          }
          span:last-child {
            color:#333;
            font-size:0.26rem;
          }
        }
      }
    }
  }
}
</style>
