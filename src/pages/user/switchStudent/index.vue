<template>
  <div class="switch_container">
    <div class="slide_con">
      <div class="slide">
        <div class="icon">
          <img src="/static/svg/radio_select.png" alt="">
        </div>
        <div class="mess">
          <div class="li">
            <div><span>学员姓名：</span><span>小虾米</span></div>
            <div><span>姓名：</span><span>男</span></div>
          </div>
          <div class="li">
            <div><span>学员姓名：</span><span>小虾米</span></div>
            <div><span>姓名：</span><span>男</span></div>
          </div>
          <div class="li">
            <div><span>学员姓名：</span><span>小虾米</span></div>
            <div><span>姓名：</span><span>男</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
page {
  background:#f2f2f2;
}
.switch_container {
  font-size:0.28rem;
  .slide_con {
    .slide {
      display:flex;
      background:#fff;
      margin:0.2rem 0;
      padding:0.2rem;
      .icon {
        width:1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.64rem;
          height: 0.64rem;
        }
      }
      .mess {
        flex:1;
        .li {
          display: flex;
          div {
            flex:1;
            span:last-child {
              color:#999;
            }
          }
          div:nth-child(2) {
            text-align:left;
          }
        }
      }
    }
  }
}
</style>
