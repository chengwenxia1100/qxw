<template>
  <div class="user_wrongTitle">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
    <!-- <div class="tab"> -->
      <!-- <tab-slide @tab="tab"></tab-slide>
      <div class="tab_container">
        <div>
          <div class="tit_change">
            <grade-slide @grade="grade"></grade-slide>
            <section-slide @section="section"></section-slide>
          </div>
          <div class="title_box"  v-if="tabVal===1">
            <div class="list">
              <p>1/20</p>
              <div class="tit" v-html="title"></div>
              <div class="title_analyse" @click="analyseBtn">试题分析</div>
            </div>
            <div class="list">
              <div class="tit" v-html="title"></div>
              <div class="title_analyse" @click="analyseBtn">试题分析</div>
            </div>
          </div>
          <div class="title_box" v-else>
            <div class="list">
              <p>1/20</p>
              <div class="tit" v-html="title"></div>
              <div class="title_analyse" @click="analyseBtn">试题分析</div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 筛选框组件 -->
      <div class="tab">
        <two-select
          @subject="subjectFun"
          @grade="gradeFun"
        ></two-select>
        <div class="chapter" v-if="total">
          <div class="select_chapter" @click="selectChapter">章节： {{chapter}}</div>
          <mpvue-picker
            ref="mpvuePicker"
            :mode="mode"
            :pickerValueDefault="pickerValueDefault"
            @onConfirm="onConfirm"
            :pickerValueArray="pickerValueArray"
          />
        </div>
      </div>
      <div class="tab_container">
        <div class="title_box">
          <div class="list" v-for="(item, i) in topicList" :key="i" v-if="total"> 
            <p>{{i+1}}/{{total}}</p>
            <div class="tit" v-html="item.topic_content"></div>
            <div class="title_analyse" @click="analyseBtn(i)">试题分析</div>
            <div style="background:#f2f2f2;width:100%;height:0.2rem;"></div>
          </div>
          <div class="no_books"v-if="total == ''">该学员暂无错题本</div>
        </div>
      </div>
      <!-- 分页 -->
      <!-- <page-slide></page-slide> -->
    <!-- </div> -->
    <!-- 点击试题分析 出现弹窗 -->
    <error-layer 
      v-if="analyLayer" 
      :analyLayer="analyLayer" 
      :topic_answer_content = "topic_answer_content"
      :from = "from"
      :difficult_level = "difficult_level"
      :topic_point="topic_point"
      @analyLayer="analyLayerFun"
    ></error-layer>
  </div>
</template>

<script>
import mpvuePicker from "mpvue-picker";
import tabSlide from '@/components/paging/tabSlide'
import gradeSlide from '@/components/paging/gradeSlide'
import sectionSlide from '@/components/paging/sectionSlide'
import pageSlide from '@/components/paging/pageSlide'
import errorLayer from '@/components/layer/errorLayer'
import { mistakeBook } from './wrongtit.api';
import twoSelect from '@/components/select/twoSelect'

export default {
  components: {
    mpvuePicker,
    pageSlide,
    tabSlide,
    sectionSlide,
    gradeSlide,
    errorLayer,
    twoSelect
  },
  data () {
    return {
      tabVal: 1, // nav的科目
      gradeVal: 7, // 年级
      sectionVal: 1, // 章节
      // 返回的试题题目
      title: '',
      analyLayer: false, // 点击试题分析弹窗
      subjectVal: '',
      gradeVal: '',
      chapter: '请选择章节',
      pickerValueArray: [],
      pickerValueDefault: [1],
      chapterList: {},
      topicList: {},
      loading: false,
      total: '',
      chapterValue: '',
      page: 1,
      topic_answer_content: '',
      from:'',
      difficult_level: ''
    }
  },
  onLoad () {
    this.loading = true
  },
  watch: {
    subjectVal (val) {
      this.loading = true
      if (val && this.gradeVal) { this.mistakeBook() }
    },
    gradeVal (val) {
      this.loading = true
      if (val && this.subjectVal) { this.mistakeBook() }
    }
  },
  methods: {
    async mistakeBook () {
      const data = await mistakeBook({
        grade: this.gradeVal,
        subject: this.gradeVal,
        chapter: this.chapterValue,
        page: this.page
      })
      this.loading = false
      this.total = data.total
      this.topicList = data.list.topic
      // this.chapter = data.list.chapter_name_array[0].label
      this.pickerValueArray = data.list.chapter_name_array
    },
    // 接收子组件传值
    tab (val) {
      console.log(val);
      this.tabVal = val
    },
    grade (val) {
      this.gradeVal = val
    },
    section (val) {
      this.sectionVal = val
    },
    analyLayerFun (val) {
      this.analyLayer = val
    },
    // 接收科目 年级子组件传值
    subjectFun (val) {
      this.subjectVal = val
    },
    gradeFun (val) {
      this.gradeVal = val
    },
    // 点击试题分析
    analyseBtn (i) {
      this.analyLayer = true;
      this.topicList.forEach((item,index,arr)=>{
        if(index === i) {
          this.topic_answer_content = item.topic_answer[0].topic_answer_content
          this.from = item.from
          this.difficult_level = item.difficult_level
          this.topic_point = item.topic_point
        }
      })
    },
    // 
    selectChapter () {
      this.$refs.mpvuePicker.show()
    },
    onConfirm (e) {
      this.loading = true
      this.chapter = e.label
      this.chapterValue = e.value[0]
      this.mistakeBook()
    },
    // async getOrderListData () {
    //   const data = await getOrderList({
    //     current: 1,
    //     size: 12,
    //     status: 3,
    //     userId: 82
    //   })
    //   console.log(data)
    // }
  }
}
</script>

<style lang="less">
.user_wrongTitle {
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
  .main_box {
    .navTab {
      background:#fff;
    }
  }
  .tab {
    width:100%;
    position:fixed;
    top:0;
    left:0;
  }
  .chapter {
    .select_chapter {
      background:#ddd;
      width:100%;
      padding:0.2rem;
    }
  }
  .tab_container {
    background:#fff;
    padding:0.2rem;
    margin-top:1.6rem;
    margin-bottom:0.2rem;
    .title_box {
      .list {
        p {
          text-align:center;
          padding:0.2rem 0;
        }
        .title_analyse {
          font-size:0.28rem;
          width:1.8rem;
          height:0.6rem;
          line-height:0.6rem;
          background:#515151;
          color:#fff;
          margin:0.4rem;
          border-radius: 0.08rem;
          text-align:center;
        }
      }
      .no_books {
        margin:0 auto;
        font-size:0.32rem;
        text-align:center;
        padding:0.6rem;
      }
    }
  }
  // .tab {
  //   width: 100%;
  //   .nav {
  //     padding: 0 20rpx;
  //     height: 80rpx;
  //     color: #999;
  //     display: flex;
  //     .title {
  //       flex: 1;
  //       text-align: center;
  //     }
  //     .selected {
  //       color: #333;
  //       border-bottom:0.02rem #515151 solid;
  //     }
  //     // .default:first-child {
  //     //   border-right: 1px solid #cdcdcd;
  //     // }
  //     .default{
  //       margin: 0.2rem 0 0 0; 
  //     }
  //   }
  // }
  // .tab_container {
  //   .tit_change {
  //     padding:0.1rem 0.2rem;
  //     clear:both;
  //     overflow:hidden;
  //     div {
  //       .change {
  //         background:#f2f2f2;
  //         float:left;
  //         margin-right:0.2rem;
  //         padding:0.1rem 0.4rem;
  //         display: flex;
  //         align-items: center;
  //         background:#ddd;
  //         img {
  //           width: 0.32rem;
  //           height: 0.32rem;
  //           margin-top: 0.1rem;
  //           padding-right:0.1rem;
  //         }
  //       }
  //     }
  //     div {
  //       .select {
  //         background:#f2f2f2;
  //         float:left;
  //         width:4rem;
  //         display: flex;
  //         align-items: center;
  //         padding:0 0.4rem;
  //         img {
  //           width: 0.64rem;
  //           height: 0.64rem;
  //           padding-right:0.1rem;
  //         }
  //       }
  //     }
  //   }
  //   .title_box {
  //     padding:0.2rem;
  //     .title_analyse {
  //       font-size:0.28rem;
  //       width:1.8rem;
  //       height:0.6rem;
  //       line-height:0.6rem;
  //       background:#515151;
  //       color:#fff;
  //       margin:0.4rem;
  //       border-radius: 0.08rem;
  //       text-align:center;
  //     }
  //   }
  // }
}
</style>
