<template>
  <div class="main_box">
    <div class="navTab">
      <ul>
        <li @click="slide1"> 
          初中数学
          <img src="/static/svg/icon_down.png" v-if="downStatus">
          <img src="/static/svg/icon_up.png" v-else>
        </li>
        <li @click="slide2">
          初二
          <img src="/static/svg/icon_down.png" v-if="upStatus">
          <img src="/static/svg/icon_up.png" v-else>
        </li>
      </ul>
    </div>
    <div class="con" v-if="!downStatus || !upStatus">
      <div class="slide_con">
        <ul>
          <li>初中数学</li>
          <li>初中无力</li>
          <li>初中语文</li>
          <li>初中英语</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      downStatus: true,
      upStatus: true,
    }
  },
  mounted () {
  },
  methods: {
    slide1 () {
      this.downStatus = !this.downStatus;
      this.upStatus = true;
    },
    slide2 () {
      this.upStatus = !this.upStatus;
      this.downStatus = true;
    }
  }
}
</script>

<style lang="less">
.main_box {
  .navTab {
    height:0.6rem;
    background:#c9c7c7;
    padding:0.1rem 0;
    ul {
      display:flex;
      li {
        flex:1;
        text-align:right;
        line-height:0.6rem;
        clear:both;
        img {
          width:0.48rem;
          height:0.48rem;
          float:right;
          margin-right:0.6rem;
          margin-top:0.06rem;
        }
      }
      li:first-child{
        border-right:0.02rem rgb(126, 125, 125) solid;
      }
    }
  }
  .con {
    background:#c9c7c7;
    width:100%;
    z-index:99;
    position: fixed;
    top:2rem;
    left:0;
    .slide_con {
      ul {
        li {
          padding:0.2rem 0;
          text-align:center;
          border-bottom:0.02rem #fff solid;
        }
      }
    }

  }
}
</style>
