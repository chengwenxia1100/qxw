<template>
  <div class="user_wrongTitle">
    <page-loading v-model='loading'>
      加载中...
    </page-loading>
      <!-- 筛选框组件 -->
      <div class="tab">
        <two-select-wrong
          @subject="subjectFun"
          @grade="gradeFun"
          @chapter="chapterFun"
        ></two-select-wrong>
        <!-- <div class="chapter" v-if="total">
          <div class="select_chapter" @click="selectChapter">章节： {{chapter}}</div>
          <mpvue-picker
            ref="mpvuePicker"
            :mode="mode"
            :pickerValueDefault="pickerValueDefault"
            @onConfirm="onConfirm"
            :pickerValueArray="pickerValueArray"
          />
        </div> -->
      </div>
      <div class="tab_container">
        <div class="title_box">
          <div class="list" v-for="(item, i) in topicList" :key="i" v-show='total'> 
            <p>{{(i+1) + (10 * page) - 10}}/{{total}}</p>
            <div class="tit" v-html="item.topic_content" style="line-height:28px;"></div>
            <div class="title_analyse" @click="analyseBtn(i)">试题分析</div>
            <div style="background:#f2f2f2;width:100%;height:0.2rem;"></div>
          </div>
          <div class="no_books" v-if="total == ''">该学员暂无错题本</div>
        </div>
      </div>
      <!-- 分页 -->
      <!-- <page-slide></page-slide> -->
      <div class="page_slide"  v-if='total > 1'>
        <!-- <div class="prev" @click="prev">上一页</div> -->
        <div class="slide_con">
          <ul>
            <li v-for="(list, i) in numlist" :key="i" @click="clickPage(list)" :class="{ 'checked': list === page ? true : false}">{{list}}</li>
          </ul>
        </div>
        <!-- <div class="next" @click="next">下一页</div> -->
      </div>
    <!-- </div> -->
    <!-- 点击试题分析 出现弹窗 -->
    <error-layer 
      v-if="analyLayer" 
      :analyLayer="analyLayer" 
      :topic_answer_content = "topic_answer_content"
      :from="from"
      :difficult_level="difficult_level"
      :topic_point="topic_point"
      @analyLayer="analyLayerFun"
    ></error-layer>
    <!-- 错题本导出 -->
    <!-- <div class="dcbtn" @click="exportWorks">
      导出错题本
    </div> -->
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
import twoSelectWrong from '@/components/select/twoSelectWrong'

export default {
  components: {
    mpvuePicker,
    pageSlide,
    tabSlide,
    sectionSlide,
    gradeSlide,
    errorLayer,
    twoSelectWrong
  },
  data () {
    return {
      tabVal: 1, // nav的科目
      // gradeVal: 7, // 年级
      // sectionVal: 1, // 章节
      // 返回的试题题目
      title: '',
      analyLayer: false, // 点击试题分析弹窗
      subjectVal: '',
      gradeVal: '',
      chapterVal: '',
      chapter: '请选择章节',
      pickerValueArray: [],
      pickerValueDefault: [1],
      chapterList: {},
      topicList: {},
      loading: false,
      total: 0,
      chapterValue: '',
      page: 1,
      topic_answer_content: '',
      from:'',
      difficult_level: '',
      numlist: []
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
    },
    chapterVal (val) {
      this.loading = true
      if (val && this.subjectVal) { this.mistakeBook() }
    }
  },
  methods: {
    async mistakeBook () {
      const data = await mistakeBook({
        grade: this.gradeVal,
        subject: this.subjectVal,
        chapter: this.chapterVal,
        page: this.page
      })
      this.loading = false
      this.total = data.total
      this.topicList = data.list.topic
      // this.chapter = data.list.chapter_name_array[0].label
      this.pickerValueArray = data.list.chapter_name_array
      this.numlist = data.num
      this.total.forEach((item,index,arr) => {
        console.log(index)
      })
    },
    //
    clickPage (page) {
      this.loading = true
      this.page = page
      this.mistakeBook()
    },
    next () {
      if (this.page < this.total) {
        this.loading = true
        this.page = this.page + 1
        this.mistakeBook()
      } else {
        wx.showToast({ title: '没有更多了', icon: 'none' })
      }
    },
    prev () {
      if(this.page > 1) {
        this.loading = true
        this.page -= this.page
        this.mistakeBook()
      } else {
        wx.showToast({ title: '没有更多了', icon: 'none' })
      }
    },
    // 导出作业本
    exportWorks () {
      wx.navigateTo({ url: '/pages/paperAnaly/analy/main?paper_id=' + paper_id })
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
    chapterFun (val) {
      this.chapterVal = val
    },
    // 点击试题分析
    analyseBtn (i) {
      this.analyLayer = true;
      this.topicList.map((item,index)=>{
        if(index === i) {
          this.topic_answer_content = item.topic_answer.topic_answer_content
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
  },
  onUnload () {
    // this.chapterList = {}
    // this.topicList = {}
    // this.subjectVal = ''
    // this.gradeVal ='',
    // this.chapterVal= ''
  }
}
</script>

<style lang="less">
page {
  background:#f2f2f2;
}
.user_wrongTitle {
  padding-bottom:2rem;
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
    z-index:999;
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
    padding:0.2rem;
    margin-top:0.6rem;
    margin-bottom:1.6rem;
    .title_box {
      .list {
        margin:0.4rem 0.2rem 0.8rem;
        padding: 0.1rem 0.3rem 0.6rem 0.3rem;;
        position:relative;
        background:#fff;
        border-radius:0.08rem;
        box-shadow: 0 4px 4px #a6dcfd;
        p {
          text-align:center;
          padding:0.2rem 0;
        }
        .title_analyse {
          position:absolute;
          bottom:-0.3rem;
          left:50%;
          font-size:0.28rem;
          width:1.8rem;
          height:0.6rem;
          line-height:0.6rem;
          background:#25A7F7;
          color:#fff;
          margin-left:-0.9rem;
          // margin:0.4rem;
          border-radius: 0.14rem;
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
  .page_slide {
    width:100%;
    box-sizing:border-box;
    padding:0.2rem 0.3rem;
    display: flex;
    position:fixed;
    bottom:0rem;
    left:0;
    background:#fff;
    .same_btn {
      width:1.4rem;
      height:0.6rem;
      font-size:0.24rem;
      border-radius: 0.08rem;
      background:#25A7F7;
      color:#fff;
      text-align: center;
      line-height: 0.6rem;
    }
    .prev {
      .same_btn
    }
    .slide_con {
      flex:1;
      white-space: nowrap;
      overflow-x: scroll;
      text-align:center;
      padding: 0.1rem 0.2rem;
      height:0.4rem;
      ul {
        white-space: nowrap;
        li {
          display: inline-block;
          border-radius:50%;
          border:0.02rem #25A7F7 solid;
          color:#25A7F7;
          width:0.4rem;
          height:0.4rem;
          font-size:0.2rem;
          text-align:center;
          line-height:0.4rem;
          margin-right:0.2rem;
          
        }
        .checked {
          color:#fff;
          background:#25A7F7;
        }
      }
    }
    .next {
      .same_btn
    }
  }
  .dcbtn {
    height:0.8rem;
    width:100%;
    background:#25A7F7;
    color:#fff;
    text-align:center;
    line-height:0.8rem;
    position:fixed;
    bottom:0;
    left:0;
  }
}
</style>
