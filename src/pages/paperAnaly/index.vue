<template>
  <div class="addwork_container">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- 筛选框组件 -->
    <two-select
      @subject="subjectFun"
      @grade="gradeFun"
    ></two-select>
    <!-- 登记 list 内容 -->
    <div class="paper_list" v-if="listStatus">
      <div class="list" v-for="(item, i) in paperListData" :key="i" @click="goRegister(item.status, item.url, item.name, item.score, item.category, item.paper_id)">
        <!-- <img :src="item.url"> -->
        <div class="middle">
          <p>{{item.name}}</p>
          <p>总分:{{item.score}}</p>
          <p>{{item.category}}</p>
        </div>
        <div class="status">
          <div v-if="item.status === 0"><p>未登记</p><img src="../../assets/svg/icon_right.png"></div>
          <div v-if="item.status === 1"><p>继续登记</p><img src="../../assets/svg/icon_right.png"></div>
          <div v-if="item.status === 2"><p style="color:#e12a22;font-size:0.64rem;">{{item.student_score}}</p><img src="../../assets/svg/icon_right.png"></div>
          <!-- <img src="../../assets/svg/icon_right.png"> -->
        </div>
      </div>
    </div>
    <div v-else class="no_paper">暂无试卷</div>
    <!--  出现弹窗 -->
    <mack-layer 
      v-if="macklayerStatus"
      :img="paperImg"
      :name="paperName"
      :mask="paperMask"
      :category="paperCategory"
      :paper_id="paper_id"
      :macklayerStatus="macklayerStatus" 
      @macklayerStatus="macklayerStatusFun"
      @studentMark="studentMark"
      @inputMask="inputMask"
    ></mack-layer>
  </div>
</template>

<script>
import twoSelect from '@/components/select/twoSelect'
import mackLayer from '@/components/layer/macklayer'
import { PaperList } from '@/api/analy'

export default {
  components: {
    twoSelect,
    mackLayer
  },
  data () {
    return {
      listStatus: true,
      macklayerStatus: false, // 弹窗的显示与隐藏
      loading: false,
      tip:false, // 弹窗中未输入考试成绩中的提示
      value: '', // 考试成绩的值
      subjectVal: '',
      gradeVal: '',
      paperListData: {},
      mask: '',
      studentmaskval: ''
    }
  },
  onLoad () {
    // this.loading = true
  },
  computed: {
    // listStatus () {
    //   if (this.paperListData.length > 0) { return true } else { false}
    // }
  },
  watch: {
    subjectVal (val) {
      if (val && this.gradeVal) { this.PaperList() }
    },
    gradeVal (val) {
      if (val && this.subjectVal) { this.PaperList() }
    }
  },
  methods: {
    async PaperList () {
      this.loading = true
      const data = await PaperList({
        subject_id: this.subjectVal,
        grade: this.gradeVal
      })
      this.loading = false
      if (data.length > 0) { this.listStatus = true } else { this.listStatus = false }
      this.paperListData = data
    },
     // 接收弹窗的子组件传值
    macklayerStatusFun (val) {
      this.macklayerStatus = val
    },
    inputMask (val) {
      if (val) { this.PaperList() }
    },
    studentMark (val) {
      this.studentmaskval = val
    },
    subjectFun (val) {
      this.subjectVal = val
    },
    gradeFun (val) {
      this.gradeVal = val
    },
    // 去登记
    goRegister (type, url, name, score, category, paper_id) {
      if (type === 0) {
        this.paperImg = url
        this.paperName = name
        this.paperMask = score
        this.paperCategory= category
        this.paper_id = paper_id
        this.macklayerStatus = true
      } else if (type === 1) {
        wx.navigateTo({ url: '/pages/paperAnaly/paperRegister/main?paper_id=' + paper_id + '&mask=' + score + '&studentmask=' + this.studentmaskval})
      } else if (type === 2) {
        wx.navigateTo({ url: '/pages/paperAnaly/analy/main?paper_id=' + paper_id })
      }
    }
  },
  onUnload () {
    this.macklayerStatus = false
    this.subjectVal = ''
    this.gradeVal = ''
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
      width:2.4rem;
      padding:0.1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        // padding-right:0.2rem;
        display:flex;
        p {
          flex:1;
          font-size:0.38rem;
          color:#707070;
          font-weight:bold;
          padding-right:0.2rem;
        }
        img {
          width:0.48rem;
          height:0.48rem;
        }
      }
      // img {
      //     width:0.48rem;
      //     height:0.48rem;
      //     position:absolute;
      //     top: 32%;
      //     right: 0;
      // }
    }
  }
  .no_paper {
    color:#666;
    font-size:0.36rem;
    margin:0.8rem auto;
    text-align:center;
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
