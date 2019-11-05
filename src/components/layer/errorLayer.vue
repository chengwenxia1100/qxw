<template>
  <div class="layer_box">
    <div class="layer">
      <div class="tit">题目详情<img src="../../assets/svg/close.png" @click="close"></div>
      <div class="con">
        <ul>
          <li><span>【答案】</span><span v-html="topic_answer_content"></span></li>
          <li><span>【来源】</span><span>{{from}}</span></li>
          <li><span>【难度】</span><span>{{difficult_level}}</span></li>
          <li><span>【知识点】</span><span>{{topic_point}}</span></li>
        </ul>
      </div>
      <!-- <fan-chart></fan-chart> -->
    </div>
  </div>
</template>

<script>
// import fanChart from '../echart/fanChart'

export default {
  components: {
    // fanChart
  },
  props: {
    analyLayer: {
      default: false
    },
    topic_answer_content: {
      default: ''
    },
    from: {
      default: ''
    },
    difficult_level: {
      default: ''
    },
    topic_point: {
      default: ''
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

<style lang='less' scoped>
.layer_box {
  width:100%;
  height:100%;
  // background:rgba(100,100,100, 0.3);
  position: fixed;
  top:0;
  left:0;
  .layer {
    margin:20% 0 0 10%;
    width:80%;
    max-height:7rem;
    background:#fff;
    border-radius:0.04rem;
    .tit {
      font-size:0.32rem;
      width:100%;
      height:0.8rem;
      text-align:center;
      line-height:0.8rem;
      background:#25A7F7;
      color:#fff;
      img {
        width: 0.48rem;
        height: 0.48rem;
        float:right;
        margin-right:0.3rem;
        margin-top:0.2rem;
      }
    }
    .con {
      padding:0.2rem;
      max-height:5.5rem;
      overflow-y:auto;
      ul {
        li {
          margin:0.3rem 0;
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
