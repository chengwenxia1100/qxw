<template>
  <div class="paperRegister_container">
    <div class="tit">
      <span>试卷名称A</span>
      <span>单元自测卷  总分：150</span>
      <span>我的得分：100</span>
    </div>
    <div class="register" v-for="(list, i) in paperList" :key="i">
      <div class="register_tit">
        <div class="left">第一部分 {{list.chapter_name}}（共{{list.score_total}}分）</div>
        <div class="right">我的得分：{{list.student_score_total}}</div>
      </div>
      <div class="register_con">
        <div class="box">
          <div class="row tit"> 
            <div class="cell">题号</div> 
            <div class="cell">题目及答案</div> 
            <div class="cell">作答情况</div>
            <div class="cell">分值</div>
            <div class="cell">得分</div>
          </div>
          <div class="row" v-for="(item, j) in paperList[i].topic_info" :key="j">
            <div class="cell">{{item.topic_number}}</div> 
            <div class="cell blue">查看</div> 
            <div class="cell">
              <img src="../../../assets/icon/icon_answer1.png" v-if="item.status == 0 | item.status == 2">
              <img src="../../../assets/icon/icon_answer_quest.png" v-if="item.status == 1" >
              <img src="../../../assets/icon/icon_answer2.png" v-if="item.status == 0 || item.status == 1">
              <img src="../../../assets/icon/icon_answer_error.png" v-if="item.status == 2 ">
            </div>
            <div class="cell">{{item.topic_score}}</div>
            <div class="cell">
              <input type="text" v-model="item.student_score" 
              @blur="blur(item.status, item.topic_id, item.student_score, list.chapter_id, list.chapter_name, item.topic_number, list.topic_type, item.topic_score)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPaperChapterList, paperTopicRegister } from '@/api/analy';

export default {
  data () {
    return {
      paper_id: 15,
      paperList: {},
      studentScore: '1', // 孩子分数
    }
  },
  onLoad () {
    this.getPaperChapterList()
  },
  watch: {
    questStatus: {
      handler (val) {
        if (val) { this.status = 1} else { this.status = 0 }
      }
    },
    errorStatus: {
      handler (val) {
        if (val) { this.status = 2} else { this.status = 0 }
      }
    },
  },
  methods: {
    // quest () {
    //   this.questStatus = !this.questStatus
    //   this.errorStatus = !this.errorStatus
    // },
    // error () {
    //   this.errorStatus = !this.errorStatus
    //   this.questStatus = !this.questStatus
    // },
    async getPaperChapterList () {
      const data = await getPaperChapterList({
        paper_id: this.paper_id
      })
      this.paperList = data
      console.log(data)
    },
    async paperTopicRegister (status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type) {
      const data = await paperTopicRegister({
        topic_id: topic_id,
        paper_id: this.paper_id,
        chapter_id: chapter_id,
        status: 1, // 作答情况
        score: student_score,
        topic_number: topic_number,
        topic_type: chapter_name
      })
    },
    blur (status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type, topic_score) {
      if (student_score > topic_score) {
        wx.showToast({ title: '打的分数不能高于题目分值～', icon: 'none' })
      } else if (status == 0) {
        wx.showToast({ title: '请选择做答情况～', icon: 'none' })
      } else if (student_score != topic_score && status == 1) {
        wx.showToast({ title: '没有满分都算做错哦～', icon: 'none' })
      } else if (student_score == topic_score && status == 2) {
        wx.showToast({ title: '题目答对应输入满分值～', icon: 'none' })
      } else {
        this.paperTopicRegister(status, topic_id, student_score, chapter_id, chapter_name, topic_number, topic_type)
      }
    }
  }
}
</script>

<style lang='less'>
.bule {
  color: #1296db;
}
.paperRegister_container {
  font-size:0.24rem;
  .tit {
    display: flex;
    padding:0.2rem;
    color:#fff;
    span {
      flex:1;
    }
    span:first-child {
      color:#333;
    }
    span:nth-child(2) {
      color:#666;
    }
    span:nth-child(3) {
      color:#666
    }
  }
  .register {
    &_tit {
      color:#fff;
      background:#707070;
      clear:both;
      overflow: hidden;
      padding:0.2rem;
      .left {
        float:left;
      }
      .right {
        float:right;
      }
    }
    &_con {
      background:#fff;
      .tit{
        background:#8a8a8a;
      }
      .box { 
        display: table;
        font-size:0.24rem;
        text-align:center;
        width:100%;
        background:#fff;
      } 
      .row { 
        display: table-row; 
      } 
      .cell { 
        display: table-cell;
        width: 20%;
        border: 1px solid #f2f2f2;
        padding:0.1rem 0;
        img {
          width: 0.36rem;
          height: 0.36rem;
        }
        img:first-child {
          margin-right:0.2rem;
        }
      }
      .blue {
        color:#1296db;
      }
    }
  }
}
 
</style>
