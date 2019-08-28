<template>
  <div class="home_container">
    <div class="stundent_info">
      <div class="student_bind">
          <div class="left_mess">
            <div class="name">名字</div>
            <div class="grade"><span>中学</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>五年级二班</span></div>
          </div>
          <div class="right_btn">
            <div class="con">切换</div>
          </div>
      </div>
    </div>
    <div class="model_list">
      <ul>
        <li>
          <img src="../../assets/icon/home_icon1.png" />
          <p>每日一题</p>
        </li>
        <li>
          <img src="../../assets/icon/home_icon2.png" />
          <p>记忆引擎</p>
        </li>
        <li>
          <img src="../../assets/icon/home_icon3.png" />
          <p>导出记录</p>
        </li>
        <li>
          <img src="../../assets/icon/home_icon4.png" />
          <p>勤学中心</p>
        </li>
      </ul>
    </div>
    <div class="model">
      <h1>错题整理</h1>
      <h2>每天记一记 分数涨一涨</h2>
      <div class="list">
        <div class="list_left">
          <p class="tip">错题登记</p>
          <p class="font">快速收集学习数据</p>
          <img src="../../assets/img/home_img1.png">
        </div>
        <div class="list_right">
          <div class="right_top">
            <p class="tip">试卷分析</p>
            <p class="font">快速了解学习动态</p>
            <img src="../../assets/img/home_img2.png">
          </div>
          <div class="right_bottom">
            <p class="tip">错题查看</p>
            <p class="font">快速生成专属错题本</p>
            <img src="../../assets/img/home_img3.png" >
          </div>
        </div>
      </div>
      <div class="list1">
        <p class="tip">错题归因</p>
        <p class="font">快速生成专属错题本</p>
        <img src="../../assets/img/home_img4.png" >
      </div>
    </div>
    <div class="mask">
      <h1>成绩曲线</h1>
      <h2>便利分析 直观成绩</h2>
      <img src="../../assets/img/home_bg.jpg" alt="">
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

<style lang='less' scoped>
.home_container {
  .stundent_info{ 
    background:#25A7F7;
    color:#fff;
    height: 1.6rem;
    padding:0.3rem;
    width:100%;
    .student_bind {
      color:#fff;
      display: flex;
       .left_mess {
         width:5rem;
         .name {
           font-size:0.34rem;
           font-weight: bold;
           padding-bottom:0.1rem;
         }
         .grade {
           color:rgba(255, 255, 255, 0.6);
           font-size:0.26rem;
         }
       }
       .right_btn {
         flex:1;
         .con {
           margin-top:0.2rem;
           width:1.28rem;
           height:0.48rem;
           text-align:center;
           line-height:0.48rem;
           background:rgba(255, 255, 255, 0.5);
           border-radius:0.24rem;
         }
       }
    }
  }
  .model_list {
    border-radius:0.2rem;
    background: #fff;
    margin:-0.3rem 0.3rem 0.3rem 0.3rem;
    ul {
      display: flex;
      li {
        flex:1;
        padding: 0.2rem;
        box-sizing:border-box;
        text-align:center;
        img {
          border-radius:50%;
          width: 0.8rem;
          height: 0.8rem;
        }
        p {
          font-size:0.28rem;
          padding:0.1rem 0;
        }
      }
    }
  }
  .model {
    padding:0.3rem;
    h1 {
      padding:0.1rem 0;
      font-size:0.32rem;
      color:#000;
    }
    h2 {
      padding:0.1rem 0 0.2rem;
      color: rgba(0, 0, 0, 0.4)
    }
    .tip {
      padding-left:0.2rem;
      padding-top:0.2rem;
      font-size:0.32rem;
      color:#000000;
    }
    .font {
      padding-top:0.2rem;
      padding-left:0.2rem;
      font-size:0.22rem;
      color:#999;
    }
    .list {
      display:flex;
      .bg_same {
        background:#fff;
        border-radius:0.2rem;
        width:3.26rem;
        position:relative;
      }
      .list_left {
        margin-right:0.16rem;
        height:3.36rem;
        img {
          width:1.84rem;
          height:1.76rem;
          position:absolute;
          bottom:0;
          right:0;
        }
        .bg_same
      }
      .list_right{ 
        .right_top {
          height:1.5rem;
          margin-bottom:0.36rem;
          img {
            width: 1.12rem;
            height: 0.64rem;
            position:absolute;
            right:0;
            bottom:0;
          }
          .bg_same
        }
        .right_bottom {
          height:1.5rem;
          img {
            width: 1.22rem;
            height: 1.22rem;
            position:absolute;
            right:0;
            bottom:0;
          }
          .bg_same
        }
      }
      
    }
    .list1 {
      height:1.76rem;
      background:#fff;
      border-radius:0.2rem;
      width:6.88rem;
      position:relative;
      margin-top:0.16rem;
      img {
        width:1.52rem;
        height:1.52rem;
        position:absolute;
        bottom:0;
        right:0;
      }
    }
  }
  .mask {
    padding:0.3rem;
    background:#fff;
    h1 {
      padding:0.1rem 0;
      font-size:0.32rem;
      color:#000;
    }
    h2 {
      padding:0.1rem 0 0.2rem;
      color: rgba(0, 0, 0, 0.4)
    }
    img {
      width:100%;
    }
    
  }
}
</style>
