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
            <div><span>性别：</span><span>男</span></div>
          </div>
          <div class="li">
            <div><span>就读学校:</span><span>德高</span></div>
            <div><span>年级：</span><span>高三</span></div>
          </div>
          <div class="li">
            <div><span>就读班级：</span><span>高三（1）班</span></div>
            <div @click="update"><a>更新学员信息></a></div>
          </div>
        </div>
      </div>
      <div class="slide">
        <div class="icon">
          <img src="/static/svg/radio_select.png" alt="">
        </div>
        <div class="mess">
          <div class="li">
            <div><span>学员姓名：</span><span>小虾米</span></div>
            <div><span>性别：</span><span>男</span></div>
          </div>
          <div class="li">
            <div><span>就读学校:</span><span>德高</span></div>
            <div><span>年级：</span><span>高三</span></div>
          </div>
          <div class="li">
            <div><span>就读班级：</span><span>高三（1）班</span></div>
            <div><a>更新学员信息></a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <div class="btn_con" @click="add">
        +添加
      </div>
      <p>*一个账号最多绑定3个学生</p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    // 增加学员
    add () {
      const url = '../add/main';
      wx.navigateTo({ url })
    },
    // 更新学员信息
    update () {
      const url = '../update/main';
      wx.navigateTo({ url })
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
        width:1.2rem;
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
          padding:0.1rem 0;
          div {
            flex:1;
            span:last-child {
              color:#999;
            }
            a {
              color:#e12a22;
              text-align:right;
            }
          }
          div:nth-child(2) {
            text-align:left;
          }
        }
      }
    }
  }
  .btn {
    text-align:center;
    .btn_con {
      color:#fff;
      background:#e12a22;
      width:80%;
      height:0.8rem;
      text-align:center;
      line-height:0.8rem;
      border-radius:0.08rem;
      margin:0.4rem auto;
    }
  }
}
</style>
