<template>
  <div class="layer_box">
    <div class="layer">
      <div class="tit">批量登记<img src="../../assets/svg/close.png" @click="close"></div>
      <div class="con">
       是谁
      </div>
    </div>
  </div>
</template>

<script>

export default {
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
