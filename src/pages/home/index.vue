<template>
    <div class="home_container"> 
        <div class="login_btn">
          请先登录
        </div>
        <div class="login_mess">
          <div class="left">
            <div class="slide1">
              <div><span>学生姓名：</span><span>网易云</span></div>
              <div><span>性别：</span><span>男</span></div>
            </div>
            <div class="slide2">
              <span>就读学校: </span><span>杭州高级中学</span>
            </div>
            <div class="slide3">
              <div><span>就读年级：</span><span>初一</span></div>
              <div><span>班级：</span><span>班</span></div>
            </div>
          </div>
          <div class="right">
            <div class="change">
              <img src="/static/svg/icon_change.png" alt="">
              切换学员
            </div>
          </div>
        </div>
        <div class="bg"></div>
        <div class="home_model">
          <ul>
            <li>
              <div>
                <img class="home-icon" src="/static/svg/home_icon1.png" />
              </div>
              <p>错题登记</p>
            </li>
            <li>
              <div class="">
                <img class="home-icon" src="/static/svg/home_icon2.png" />
              </div>
              <p>试卷分析</p>
            </li>
            <li>
              <div class="">
                <img class="home-icon" src="/static/svg/home_icon3.png" />
              </div>
              <p>错题查看</p>
            </li>
            <li>
              <div>
                <img class="home-icon" src="/static/svg/home_icon4.png" />
              </div>
              <p>错题归因</p>
            </li>
            <li>
              <div class="">
                <img class="home-icon" src="/static/svg/home_icon5.png" />
              </div>
              <p>每日一题</p>
            </li>
            <li>
              <div class="">
                <img class="home-icon" src="/static/svg/home_icon6.png" />
              </div>
              <p>记忆引擎</p>
            </li>
            <li>
              <div>
                <img class="home-icon" src="/static/svg/home_icon7.png" />
              </div>
              <p>导出记录</p>
            </li>
            <li>
              <div class="">
                <img class="home-icon" src="/static/svg/home_icon8.png" />
              </div>
              <p>勤学中心</p>
            </li>
          </ul>
        </div>
        <div class="curve">
          <div class="curve_tit">成绩曲线</div>
          <div class="curve_con">
            <p><span>学科: </span><span>数学</span></p>
            <div class="chart">
              <div class="no_chart">
                暂无数据
              </div>
            </div>
          </div>
        </div>
        <div class="advice">
          <div class="advice_tit">
            通知公告
          </div>
          <div class="advice_con">
            导出功能已更新,请及时查看
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

<style lang="less" scoped>
.home_container {
  padding-bottom:0.2rem;
  .bg {
    height:0.2rem;
    width:100%;
    background:#f2f2f2;
  }
  .tit{
    background:#f2f2f2;
    width:100%;
    font-size:0.24rem;
    padding:0.1rem 0;
  }
  .login_btn {
    width:80%;
    height:0.8rem;
    background:#f7536a;
    margin:0.2rem auto;
    border-radius:0.5rem;
    color:#fff;
    font-size:0.32rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login_mess {
    display: flex;
    font-size:0.28rem; 
    .left {
      flex:1;
      .slide_same {
        padding:0.2rem 0.4rem 0.2rem 0.2rem;
        clear:both;
        overflow: hidden;
        div:first-child {
          float:left;
           
        }
        div:nth-child(2) {
          float:right;
        }
      }
      .slide1 {
        .slide_same
      }
      .slide2 {
        .slide_same
      }
      .slide3 {
        .slide_same
      }
    }
    .right {
      width:2rem;
      padding:0.2rem 0;
      .change {
        text-align:center;
        display: flex;
        align-items:center;
        img {
          width: 0.32rem;
          height: 0.32rem;
          padding-right:0.2rem;
        }
      }
    }
  }
  .home_model {
    ul {
      clear:both;
      overflow:hidden;
      li {
        width:25%;
        float:left;
        padding: 0.2rem;
        box-sizing:border-box;
        text-align:center;
        div {
          background: #666;
          border-radius:50%;
          width: 1.4rem;
          height: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .home-icon {
            width: 0.64rem;
            height: 0.64rem;
          }
        }
        p {
          font-size:0.28rem;
          padding:0.1rem 0;
        }
      }
    }
  }
  .curve {
    &_tit {
      .tit
    }
    &_con {
      padding:0.2rem;
      p {
        font-size:0.28rem;
        span:first-child {
          font-weight:bold;
        }
      }
      .chart {
        .no_chart {
          padding:0.5rem 0;
          font-size:0.32rem;
          display:flex;
          justify-content: center;
          align-content: center;
        }
      }
    }
  }
  .advice {
    &_tit {
      .tit
    }
    &_con {
      font-size:0.32rem;
      text-align:center;
      padding:0.2rem 0;
    }
  }
}
</style>
