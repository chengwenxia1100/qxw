<template>
  <div class="addwork_container">
    <!-- 筛选框组件 -->
    <two-select
      @subject="subjectFun"
      @grade="gradeFun"
    ></two-select>
    <!-- <div class="paper_list">
      <div class="list" @click="goRegister">
        <img src="@/assets/img/bg.jpg">
        <div class="middle">
          <p>作业本一</p>
          <p>初二上册</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <p>未登记</p>
          <img src="@/assets/svg/icon_right.png">
        </div>
      </div>
      <div class="list">
        <img src="@/assets/img/bg.jpg">
        <div class="middle">
          <p>作业本一</p>
          <p>初二上册</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <p class="mark">101</p>
          <img src="@/assets/svg/icon_right.png">
        </div>
      </div>
      <div class="list">
        <img src="@/assets/img/bg.jpg">
        <div class="middle">
          <p>作业本一</p>
          <p>初二上册</p>
          <p>浙江教育出版社</p>
        </div>
        <div class="status">
          <p>继续登记</p>
          <img src="@/assets/svg/icon_right.png">
        </div>
      </div>
    </div> -->
    <!--  出现弹窗 -->
    <mack-layer 
      v-if="macklayerStatus" 
      :paperData="paperData"
      :macklayerStatus="macklayerStatus" 
      @macklayerStatus="macklayerStatusFun"
    ></mack-layer>
    <!-- <div class="macklayer" v-if="macklayer">
      <div class="layer">
        <div class="tit">试卷登记<img src="@/assets/svg/close.png" @click="close"></div>
        <div class="con">
          <div class="list" @click="goRegister">
            <img src="@/assets/img/bg.jpg">
            <div class="middle">
              <p>作业本一</p>
              <p>初二上册</p>
              <p>浙江教育出版社</p>
            </div>
          </div>
          <div class="inout">
            <span>试卷分值</span>
            <input type="text" placeholder="请输入考试成绩" v-model="value">
          </div>
          <p class="red" v-if="tip">请输入考试成绩</p>
          <div class="btn_con">
            <div class="btn" @click="confirm">
              确定
            </div>
          </div>
        </div>
        <fan-chart></fan-chart>
      </div>
    </div> -->
  </div>
</template>

<script>
import twoSelect from '@/components/select/twoSelect'
import mackLayer from '@/components/layer/macklayer'
import { paperAnaly } from '@/api/analy';

export default {
  components: {
    twoSelect,
    mackLayer
  },
  data () {
    return {
      macklayerStatus: false, // 弹窗的显示与隐藏
      tip:false, // 弹窗中未输入考试成绩中的提示
      value: '', // 考试成绩的值
      subject: '', // 学生科目
      grade: '', // 学生年级
    }
  },
  onLoad () {
    // this.paperAnaly()
  },
  methods: {
    async paperAnaly () {
      const data = await paperAnaly({
        subject: this.subject,
        grade: this.grade
      })
      this.paperData = data
    },
    // 去登记
    goRegister () {
      this.macklayerStatus = true;
    },
    // 接收弹窗的子组件传值
    macklayerStatusFun (val) {
      this.macklayerStatus = val
    },
    subjectFun (val) {
      this.subject = val
    },
    gradeFun (val) {
      this.grade = val
    }
  }
}
</script>

<style lang="less">
.bule {
  color: #1296db
}
.addwork_container {
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
      img {
          width:0.48rem;
          height:0.48rem;
          position:absolute;
          right:0;
      }
    }
  }
  // .macklayer {
  //   width:100%;
  //   height:100%;
  //   background:rgba(100,100,100, 0.3);
  //   position: fixed;
  //   top:0;
  //   left:0;
  //   .layer {
  //     margin:20% 0 5% 10%;
  //     width:80%;
  //     background:#fff;
  //     border-radius:0.04rem;
  //     .tit {
  //       font-size:0.32rem;
  //       width:100%;
  //       height:0.8rem;
  //       text-align:center;
  //       line-height:0.8rem;
  //       background:rgb(180, 178, 178);
  //       color:#fff;
  //       img {
  //         width: 0.36rem;
  //         height: 0.36rem;
  //         float:right;
  //         margin-right:0.3rem;
  //         margin-top:0.3rem;
  //       }
  //     }
  //     .con {
  //       .list {
  //         padding:0.2rem 0.3rem;
  //         display: flex;
  //         background:#fff;
  //         img {
  //           width:1.5rem;
  //           height:2rem;
  //         }
  //         .middle {
  //           flex:1;
  //           padding:0.1rem 0.2rem;
  //           p {
  //             padding:0.1rem 0;
  //           }
  //           p:nth-child(2) {
  //             color:#666;
  //           }
  //           p:nth-child(3) {
  //             color:#666;
  //           }
  //         }
  //       }
  //       .inout {
  //         font-size:0.34rem;
  //         display: flex;
  //         padding:0.1rem 0.3rem;
  //         span {
  //           margin-right:0.2rem;
  //           margin-top:0.1rem;
  //         }
  //         input {
  //           border:0.02rem #666 solid;
  //           width:2.6rem;
  //           height:0.6rem;
  //           padding:0 0.2rem;
  //           border-radius: 0.08rem;
  //         }
  //       }
  //     }
  //     .red {
  //       padding: 0 0.3rem;
  //       font-size:0.28rem;
  //       color:#e12a22;
  //     }
  //     .btn_con {
  //       height:1rem;
  //       .btn {
  //         width:2rem;
  //         height:0.6rem;
  //         border:0.02rem #666 solid;
  //         text-align:center;
  //         line-height:0.6rem;
  //         margin: 0.4rem auto 0.4rem;
  //         border-radius:0.08rem;
  //       }
  //     }
  //   }
  // }
}
</style>
